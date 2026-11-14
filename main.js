/* ============================================================
   七宗罪 · 首页交互逻辑
   多雷版画风「十字架圣像」：上帝全知之眼 + 放射圣光 + 十字七罪
   ============================================================ */

(function () {
  'use strict';

  var SVGNS = 'http://www.w3.org/2000/svg';

  // 七罪「十字架」坐标（1000×1000 视图坐标）——
  // 傲慢居十字交叉处（万罪之心），嫉妒居其上方，懒惰/暴食/色欲于其下方均匀分布
  var CROSS = [
    { x: 500, y: 360 },  // 傲慢 Pride —— 十字交叉处
    { x: 500, y: 210 },  // 嫉妒 Envy —— 傲慢之上
    { x: 250, y: 360 },  // 暴怒 Wrath —— 左臂
    { x: 500, y: 510 },  // 懒惰 Sloth —— 傲慢之下
    { x: 750, y: 360 },  // 贪婪 Greed —— 右臂
    { x: 500, y: 660 },  // 暴食 Gluttony —— 傲慢之下
    { x: 500, y: 810 }   // 色欲 Lust —— 傲慢之下（足）
  ];

  // ---- DOM 引用 ----
  var stageEl = document.getElementById('stage');
  var sealEl = document.getElementById('seal');
  var nodesEl = document.getElementById('nodes');
  var gloryEl = document.getElementById('glory');
  var cloudsEl = document.getElementById('clouds');
  var introCard = document.getElementById('introCard');
  var introCn = document.getElementById('introCn');
  var introLatin = document.getElementById('introLatin');
  var introBrief = document.getElementById('introBrief');
  var introHex = document.getElementById('introHex');
  var introGo = document.getElementById('introGo');
  var cursorEl = document.getElementById('cursor');

  var nodeEls = [];
  var selected = -1;
  var clearTimer = null;
  var launching = false;
  var coarse = window.matchMedia('(pointer: coarse)').matches;

  // ---- SVG 工具 ----
  function svgEl(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  // ---- 上帝全知之眼 + 放射圣光（按视口比例动态重绘） ----
  function renderGlory() {
    var ratio = window.innerWidth / window.innerHeight;
    var W = Math.max(560, Math.round(1000 * ratio));
    var H = 1000;
    var cx = W / 2, cy = 72;
    var s = Math.min(W, H);

    gloryEl.innerHTML = '';
    var svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, 'class': 'glory-svg', preserveAspectRatio: 'none' });

    var defs = svgEl('defs', {});
    var rg = svgEl('radialGradient', { id: 'gglow', cx: '50%', cy: '50%', r: '55%' });
    rg.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#f0d79a', 'stop-opacity': '0.5' }));
    rg.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#f0d79a', 'stop-opacity': '0' }));
    var lg = svgEl('linearGradient', { id: 'gbeam', x1: '0', y1: '0', x2: '0', y2: '1' });
    lg.appendChild(svgEl('stop', { offset: '0%', 'stop-color': '#e7dcc3', 'stop-opacity': '0.12' }));
    lg.appendChild(svgEl('stop', { offset: '100%', 'stop-color': '#e7dcc3', 'stop-opacity': '0' }));
    defs.appendChild(rg); defs.appendChild(lg);
    svg.appendChild(defs);

    svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: s * 0.24, 'class': 'g-glow' }));

    svg.appendChild(svgEl('polygon', { points: cx + ',' + cy + ' ' + (cx - 0.62 * W) + ',' + H + ' ' + (cx + 0.62 * W) + ',' + H, 'class': 'g-beam' }));
    svg.appendChild(svgEl('polygon', { points: cx + ',' + cy + ' ' + (cx - 0.30 * W) + ',' + H + ' ' + (cx + 0.30 * W) + ',' + H, 'class': 'g-beam', opacity: '0.6' }));

    [0.11, 0.125, 0.14].forEach(function (m, i) {
      svg.appendChild(svgEl('circle', { cx: cx, cy: cy, r: s * m, 'class': 'g-halo', opacity: (0.5 - i * 0.14) }));
    });

    for (var i = 0; i < 32; i++) {
      var a = i * Math.PI * 2 / 32;
      svg.appendChild(svgEl('line', {
        x1: cx + s * 0.155 * Math.cos(a), y1: cy + s * 0.155 * Math.sin(a),
        x2: cx + s * 0.20 * Math.cos(a), y2: cy + s * 0.20 * Math.sin(a),
        'class': 'g-spoke', opacity: 0.35
      }));
    }

    for (var r = 0; r < 17; r++) {
      var t = (r - 8) / 8;
      var x1 = cx + t * 0.05 * W, y1 = cy + s * 0.09;
      var x2 = cx + t * 0.66 * W, y2 = H;
      svg.appendChild(svgEl('line', {
        x1: x1.toFixed(1), y1: y1.toFixed(1), x2: x2.toFixed(1), y2: y2,
        'class': 'g-ray', opacity: (0.5 - Math.abs(t) * 0.42).toFixed(2)
      }));
    }

    var eyeW = s * 0.18;
    svg.appendChild(svgEl('use', {
      href: '#icon-all',
      x: cx - eyeW / 2, y: cy - eyeW / 2,
      width: eyeW, height: eyeW,
      'class': 'g-eye'
    }));

    gloryEl.appendChild(svg);
  }

  // ---- 版画云霭 ----
  function buildClouds() {
    var svg = svgEl('svg', { viewBox: '0 0 1000 360', 'class': 'clouds-svg', preserveAspectRatio: 'xMidYMax slice' });

    for (var r = 0; r < 2; r++) {
      var y = 302 + r * 24;
      var rr = 54 - r * 14;
      var start = -60 + (r % 2) * 48;
      for (var x = start; x < 1120; x += 96) {
        svg.appendChild(svgEl('circle', { cx: x, cy: y, r: rr, 'class': 'c-billow', opacity: (0.42 - r * 0.14) }));
      }
    }
    for (var s = 0; s < 5; s++) {
      var sy = 190 + s * 32;
      var d = 'M -20 ' + sy + ' Q 250 ' + (sy - 18) + ' 500 ' + sy + ' T 1020 ' + sy;
      svg.appendChild(svgEl('path', { d: d, 'class': 'c-strata', opacity: (0.3 - s * 0.05).toFixed(2) }));
    }

    cloudsEl.appendChild(svg);
  }

  // ---- 十字架（轮廓 + 光束 + 交点光晕） ----
  function buildCross() {
    sealEl.appendChild(svgEl('rect', { x: 448, y: 30, width: 104, height: 830, rx: 3, 'class': 'cross-fill' }));
    sealEl.appendChild(svgEl('rect', { x: 170, y: 322, width: 660, height: 76, rx: 3, 'class': 'cross-fill' }));
    sealEl.appendChild(svgEl('circle', { cx: 500, cy: 360, r: 80, 'class': 'cross-halo' }));
    sealEl.appendChild(svgEl('line', { x1: 500, y1: 26, x2: 500, y2: 864, 'class': 'cross-beam' }));
    sealEl.appendChild(svgEl('line', { x1: 66, y1: 360, x2: 934, y2: 360, 'class': 'cross-beam' }));
  }

  // ---- 哥特玫瑰花窗（十字节点共用）——
  //   圆核（内嵌罪之符文，r17.2）+ 八枚尖叶花瓣（由核发散至外框）+ 八枚圆孔窗（落在两瓣之间）
  //   + 双线石框；四重同心，整体是一朵盛开的圆形花窗。
  var ROSE_CX = 50, ROSE_CY = 56;
  var ROSE_PETAL = 8;        // 花瓣数（八出：小尺幅下每片才看得清）
  var ROSE_OCULI = 8;        // 圆孔窗数（与花瓣一一错开，一枚花瓣对一枚圆窗）

  function rosePt(r, deg) {
    var a = (deg - 90) * Math.PI / 180;
    return [ROSE_CX + r * Math.cos(a), ROSE_CY + r * Math.sin(a)];
  }
  // 沿切线偏移 t 个单位处的点（用于贝塞尔控制点）
  function roseTan(r, deg, t) {
    return rosePt(r, deg + t / r * 57.2958);
  }
  function f1(v) { return v.toFixed(1); }
  function xy(p) { return f1(p[0]) + ' ' + f1(p[1]); }

  function buildRoseWindow(sin) {
    var s = '';

    // 玻璃底（极淡的同色调）+ 双线石框
    s += '<circle cx="50" cy="56" r="45" fill="currentColor" fill-opacity="0.13"' +
         ' stroke="currentColor" stroke-width="1.6"/>';
    s += '<circle cx="50" cy="56" r="41.5" fill="none" stroke="currentColor"' +
         ' stroke-width="0.7" opacity="0.45"/>';

    // 花瓣环：尖叶形（两端收尖、中段鼓起），八枚均布
    var petals = '';
    var pstep = 360 / ROSE_PETAL;
    for (var i = 0; i < ROSE_PETAL; i++) {
      var a0 = i * pstep;
      var B = rosePt(17.4, a0), T = rosePt(41.4, a0);
      var c1 = roseTan(24, a0, 5.6), c2 = roseTan(33, a0, 4.2);
      var c3 = roseTan(33, a0, -4.2), c4 = roseTan(24, a0, -5.6);
      petals += 'M' + xy(B) + 'C' + xy(c1) + ' ' + xy(c2) + ' ' + xy(T) +
                'C' + xy(c3) + ' ' + xy(c4) + ' ' + xy(B) + 'Z';
    }
    s += '<path d="' + petals + '" fill="currentColor" fill-opacity="0.09" stroke="currentColor"' +
         ' stroke-width="1" stroke-opacity="0.65" stroke-linejoin="round"/>';

    // 外圈：圆孔窗，与花瓣一一错开（每两瓣之间恰好一枚）
    var oculi = '';
    var ostep = 360 / ROSE_OCULI;
    for (var j = 0; j < ROSE_OCULI; j++) {
      var p = rosePt(34.6, j * ostep + ostep / 2);
      oculi += '<circle cx="' + f1(p[0]) + '" cy="' + f1(p[1]) + '" r="4.8"/>';
    }
    s += '<g fill="currentColor" fill-opacity="0.3" stroke="currentColor"' +
         ' stroke-width="0.9" stroke-opacity="0.75">' + oculi + '</g>';

    // 圆核：双层环 + 该罪的符文
    s += '<circle cx="50" cy="56" r="17.2" fill="currentColor" fill-opacity="0.2"' +
         ' stroke="currentColor" stroke-width="1.2"/>';
    s += '<circle cx="50" cy="56" r="14.8" fill="none" stroke="currentColor"' +
         ' stroke-width="0.6" opacity="0.45"/>';
    s += '<use href="#icon-' + sin.id + '" x="36" y="42" width="28" height="28"/>';

    // 题名（窗下铭牌）
    s += '<text x="50" y="122.5" class="sw-name" text-anchor="middle">' + sin.name + '</text>';
    s += '<text x="50" y="136" class="sw-latin" text-anchor="middle">' + sin.latin.toUpperCase() + '</text>';

    return '<svg viewBox="0 0 100 140" aria-hidden="true">' + s + '</svg>';
  }

  // ---- 十字节点（玫瑰花窗） ----
  function buildNodes() {
    SINS.forEach(function (sin, i) {
      var p = CROSS[i];
      var btn = document.createElement('button');
      btn.className = 'node';
      btn.type = 'button';
      btn.setAttribute('aria-label', sin.name + ' ' + sin.latin);
      btn.style.left = (p.x / 10) + '%';
      btn.style.top = (p.y / 10) + '%';
      btn.style.setProperty('--node-color', sin.color);
      btn.innerHTML = buildRoseWindow(sin);
      btn.addEventListener('mouseenter', function () { select(i); });
      btn.addEventListener('focus', function () { select(i); });
      btn.addEventListener('click', function () { onNodeClick(i); });
      nodesEl.appendChild(btn);
      nodeEls.push(btn);
    });

    stageEl.addEventListener('mouseleave', function () {
      clearTimer = setTimeout(clearSelect, 260);
    });
    introCard.addEventListener('mouseenter', function () { clearTimeout(clearTimer); });
  }

  // ---- 选中（仅十字节点触发展示窗口） ----
  function select(i) {
    clearTimeout(clearTimer);
    if (selected === i) return;
    clearSelect();
    selected = i;
    nodeEls[i].classList.add('is-active');
    showIntro(SINS[i], i);
  }

  function clearSelect() {
    selected = -1;
    nodeEls.forEach(function (n) { n.classList.remove('is-active'); });
    introCard.classList.remove('show');
    introCard.setAttribute('aria-hidden', 'true');
  }

  function showIntro(sin, i) {
    introCn.textContent = sin.name;
    introLatin.textContent = sin.latin.toUpperCase();
    introBrief.textContent = sin.brief;
    introHex.textContent = sin.color.toUpperCase();
    introCard.style.setProperty('--glow', sin.color);
    positionCard(i);
    introCard.classList.add('show');
    introCard.setAttribute('aria-hidden', 'false');
  }

  // 浮窗紧贴所悬停的 icon，自动避让屏幕边缘，不遮挡任何节点
  // 手机上不做跟随定位：交给 CSS 贴底显示（跟随会把节点整个盖住）
  function positionCard(i) {
    if (window.matchMedia('(max-width: 760px)').matches) {
      introCard.style.left = '';
      introCard.style.top = '';
      return;
    }
    var r = nodeEls[i].getBoundingClientRect();
    var cw = introCard.offsetWidth;
    var ch = introCard.offsetHeight;
    var gap = 18;
    var vw = window.innerWidth, vh = window.innerHeight;

    var x = r.right + gap;
    if (x + cw > vw - 8) x = r.left - gap - cw;
    x = Math.max(8, Math.min(vw - cw - 8, x));

    var y = r.top + r.height / 2 - ch / 2;
    y = Math.max(8, Math.min(vh - ch - 8, y));

    introCard.style.left = x + 'px';
    introCard.style.top = y + 'px';
  }

  function onNodeClick(i) {
    if (coarse && selected !== i) { select(i); return; }
    launch(i);
  }

  // ---- 塔罗牌转场 + 跳转子页面 ----
  function launch(i) {
    if (launching) return;
    launching = true;
    var sin = SINS[i];

    var overlay = document.createElement('div');
    overlay.className = 'tarot-overlay';
    overlay.style.setProperty('--card-color', sin.color);
    overlay.style.setProperty('--card-deep', sin.colorDeep);
    overlay.innerHTML =
      '<div class="tarot-fill"></div>' +
      '<div class="tarot-scene">' +
        '<div class="tarot-card">' +
          '<div class="face front">' +
            '<span class="frame"></span>' +
            '<div class="tlabel">' + ROMAN[sin.index - 1] + ' · PECCATUM</div>' +
            '<svg viewBox="0 0 100 100"><use href="#icon-' + sin.id + '"></use></svg>' +
            '<div class="tname"><div class="cn">' + sin.name + '</div><div class="latin">' + sin.latin + '</div></div>' +
          '</div>' +
          '<div class="face back">' +
            '<svg viewBox="0 0 100 100"><use href="#icon-' + sin.id + '"></use></svg>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('active');
      });
    });

    setTimeout(function () { overlay.classList.add('flipped'); }, 560);
    setTimeout(function () { overlay.classList.add('fill'); }, 1350);
    setTimeout(function () {
      window.location.href = 'sin.html#' + sin.id;
    }, 1850);
  }

  // ---- 火星粒子 ----
  var emberCanvas = document.getElementById('embers');
  var emberCtx = emberCanvas.getContext('2d');
  var EW, EH, embers = [];

  function resizeEmbers() {
    EW = emberCanvas.width = window.innerWidth;
    EH = emberCanvas.height = window.innerHeight;
  }
  function makeEmbers() {
    embers = [];
    var n = Math.min(70, Math.floor(EW * EH / 22000));
    for (var i = 0; i < n; i++) {
      embers.push({
        x: Math.random() * EW, y: Math.random() * EH,
        r: Math.random() * 1.7 + 0.4,
        vy: Math.random() * 0.35 + 0.08,
        drift: Math.random() * 0.5 + 0.1,
        ph: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.7
      });
    }
  }
  function drawEmbers() {
    emberCtx.clearRect(0, 0, EW, EH);
    var t = performance.now() / 1000;
    for (var i = 0; i < embers.length; i++) {
      var p = embers[i];
      p.y -= p.vy;
      p.ph += 0.01;
      p.x += Math.sin(p.ph) * p.drift * 0.3;
      if (p.y < -10) { p.y = EH + 10; p.x = Math.random() * EW; }
      var flick = 0.5 + 0.5 * Math.sin(t * 2 + p.ph * 5);
      var a = 0.12 + 0.26 * flick;
      emberCtx.beginPath();
      emberCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      emberCtx.fillStyle = p.warm ? 'rgba(220,180,110,' + a + ')' : 'rgba(245,232,205,' + (a * 0.6) + ')';
      emberCtx.fill();
    }
    requestAnimationFrame(drawEmbers);
  }

  // ---- 光标 & 视差 ----
  //   只在「还在动」的时候写 transform，停稳后立刻停掉 rAF。
  //   原先无条件每帧写 4 个 style，鼠标不动也在空转，
  //   逼着带 drop-shadow 的花窗、光柱、云霭反复重绘。
  var cX = 0, cY = 0, tX = 0, tY = 0;
  var pX = 0, pY = 0, tpX = 0, tpY = 0;
  var rafOn = false;

  function loop() {
    cX += (tX - cX) * 0.18;
    cY += (tY - cY) * 0.18;
    pX += (tpX - pX) * 0.06;
    pY += (tpY - pY) * 0.06;

    var moving = Math.abs(tX - cX) > 0.08 || Math.abs(tY - cY) > 0.08 ||
                 Math.abs(tpX - pX) > 0.008 || Math.abs(tpY - pY) > 0.008;

    if (moving) {
      cursorEl.style.transform = 'translate(' + cX.toFixed(2) + 'px,' + cY.toFixed(2) + 'px)';
      stageEl.style.transform = 'translate(' + pX.toFixed(2) + 'px,' + pY.toFixed(2) + 'px)';
      gloryEl.style.transform = 'translate(' + (pX * 0.35).toFixed(2) + 'px,' + (pY * 0.25).toFixed(2) + 'px)';
      cloudsEl.style.transform = 'translateX(-50%) translate(' + (-pX * 0.45).toFixed(2) + 'px,' + (-pY * 0.18).toFixed(2) + 'px)';
      requestAnimationFrame(loop);
    } else {
      rafOn = false;   // 收敛完成，等下一次指针移动再唤醒
    }
  }

  function wake() {
    if (!rafOn) { rafOn = true; requestAnimationFrame(loop); }
  }

  window.addEventListener('pointermove', function (e) {
    tX = e.clientX; tY = e.clientY;
    tpX = (e.clientX / window.innerWidth - 0.5) * 14;
    tpY = (e.clientY / window.innerHeight - 0.5) * 14;
    wake();
  }, { passive: true });

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('.node, .go, a, button')) cursorEl.classList.add('is-active');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('.node, .go, a, button')) cursorEl.classList.remove('is-active');
  });

  // ---- 初始化 ----
  renderGlory();
  buildClouds();
  buildCross();
  buildNodes();
  resizeEmbers();
  makeEmbers();
  drawEmbers();
  // 视差循环不预热：等第一次指针移动由 wake() 拉起，静止时零开销

  introGo.addEventListener('click', function () {
    if (selected >= 0) launch(selected);
  });

  // 炼狱山目录 · 展开/收起（手机端为抽屉：遮罩、× 、Esc、点链接都收起）
  var purgatoryToggle = document.getElementById('purgatoryToggle');
  var purgatory = document.getElementById('purgatory');
  var purgatoryScrim = document.getElementById('purgatoryScrim');
  var purgatoryClose = document.getElementById('purgatoryClose');

  function setPurgatory(on) {
    document.body.classList.toggle('show-purgatory', on);
    purgatoryToggle.setAttribute('aria-expanded', on ? 'true' : 'false');
    purgatory.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  purgatoryToggle.addEventListener('click', function () {
    setPurgatory(!document.body.classList.contains('show-purgatory'));
  });
  purgatoryScrim.addEventListener('click', function () { setPurgatory(false); });
  purgatoryClose.addEventListener('click', function () {
    setPurgatory(false);
    purgatoryToggle.focus();
  });
  purgatory.addEventListener('click', function (e) {
    if (e.target.closest('a')) setPurgatory(false);   // 选层后先收起，再跳转
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('show-purgatory')) {
      setPurgatory(false);
      purgatoryToggle.focus();
    }
  });

  // 触摸端没有 mouseleave，点空白处收起简介卡（否则卡片会一直挂在底部）
  document.addEventListener('click', function (e) {
    if (e.target.closest('.node, .intro-card, .purgatory, .purgatory-toggle')) return;
    if (selected >= 0) clearSelect();
  }, { passive: true });

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    resizeEmbers(); makeEmbers();
    if (selected >= 0) positionCard(selected);
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderGlory, 160);
  });
})();
