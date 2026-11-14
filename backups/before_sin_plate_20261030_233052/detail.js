/* ============================================================
   七宗罪 · 子页面逻辑
   ============================================================ */

(function () {
  'use strict';

  // ---- 解析当前罪 ----
  var hash = location.hash.match(/^#([\w-]+)$/);
  var sin = null;
  if (hash) {
    for (var i = 0; i < SINS.length; i++) {
      if (SINS[i].id === hash[1]) { sin = SINS[i]; break; }
    }
  }
  if (!sin) { sin = SINS[0]; location.hash = sin.id; }

  document.body.style.setProperty('--sin', sin.color);
  document.body.style.setProperty('--sin-deep', sin.colorDeep);
  document.title = sin.name + ' · ' + sin.latin + ' — 七宗罪';

  var bootSigil = document.getElementById('bootSigil');
  bootSigil.setAttribute('href', '#icon-' + sin.id);

  // ---- 抽象画像：密教曼陀罗封印 ----
  function starLines(cx, cy, r, step) {
    var pts = [], lines = [];
    for (var i = 0; i < 7; i++) {
      var a = (-90 + i * 360 / 7) * Math.PI / 180;
      pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
    for (var j = 0; j < 7; j++) {
      var p = pts[j], q = pts[(j + step) % 7];
      lines.push([p.x.toFixed(2), p.y.toFixed(2), q.x.toFixed(2), q.y.toFixed(2)]);
    }
    return lines;
  }

  function buildPortrait() {
    var s = '<svg viewBox="0 0 400 400" class="portrait-svg" aria-hidden="true">';
    s += '<defs><radialGradient id="pfill-' + sin.id + '" cx="50%" cy="50%" r="50%">' +
         '<stop offset="0%" stop-color="' + sin.color + '" stop-opacity=".26"/>' +
         '<stop offset="62%" stop-color="' + sin.color + '" stop-opacity=".06"/>' +
         '<stop offset="100%" stop-color="' + sin.color + '" stop-opacity="0"/>' +
         '</radialGradient></defs>';

    // 背景填充
    s += '<circle cx="200" cy="200" r="195" fill="url(#pfill-' + sin.id + ')" stroke="none"/>';

    // 外环 + 珠链
    s += '<circle cx="200" cy="200" r="188" class="pr" fill="none"/>';
    s += '<circle cx="200" cy="200" r="176" class="pr-d" fill="none"/>';
    for (var b = 0; b < 24; b++) {
      var ba = b * Math.PI * 2 / 24;
      s += '<circle cx="' + (200 + 176 * Math.cos(ba)).toFixed(2) + '" cy="' + (200 + 176 * Math.sin(ba)).toFixed(2) + '" r="2.4" class="bead"/>';
    }

    // 大七芒星 {7/3}
    var big = starLines(200, 200, 150, 3);
    s += '<g class="star-big">';
    big.forEach(function (l) { s += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '"/>'; });
    s += '</g>';

    // 小七芒星 {7/2}
    var small = starLines(200, 200, 86, 2);
    s += '<g class="star-small">';
    small.forEach(function (l) { s += '<line x1="' + l[0] + '" y1="' + l[1] + '" x2="' + l[2] + '" y2="' + l[3] + '"/>'; });
    s += '</g>';

    // 顶点
    for (var v = 0; v < 7; v++) {
      var va = (-90 + v * 360 / 7) * Math.PI / 180;
      s += '<circle cx="' + (200 + 150 * Math.cos(va)).toFixed(2) + '" cy="' + (200 + 150 * Math.sin(va)).toFixed(2) + '" r="4" class="vdot"/>';
    }

    // 内环 + 中心图标
    s += '<circle cx="200" cy="200" r="120" class="pr" fill="none"/>';
    s += '<circle cx="200" cy="200" r="104" class="icon-ring"/>';
    s += '<use href="#icon-' + sin.id + '" x="150" y="150" width="100" height="100" class="p-icon"/>';
    s += '</svg>';
    return s;
  }

  // ---- 渲染内容 ----
  function render() {
    var virtues = '';
    VIRTUES.forEach(function (v) {
      var cur = (v.name === sin.virtue) ? ' current' : '';
      virtues +=
        '<div class="virtue-item' + cur + '" style="--vc:' + v.color + '">' +
          '<div class="v-sym"></div>' +
          '<div class="v-name">' + v.name + '</div>' +
          '<div class="v-latin">' + v.latin + '</div>' +
        '</div>';
    });

    var html =
      '<section class="hero reveal">' +
        '<div class="hero-main">' +
          '<div class="hero-kicker">第' + CN_NUM[sin.index - 1] + '宗罪 · ' + ROMAN[sin.index - 1] + '</div>' +
          '<h1 class="hero-title">' + sin.name + '</h1>' +
          '<div class="hero-sub">' + sin.en + '</div>' +
          '<div class="hero-latin">' + sin.latin + '</div>' +
          '<div class="hero-tag"><span class="dot"></span>对应恶魔 · ' + sin.demon + '</div>' +
        '</div>' +
        '<div class="hero-portrait">' + buildPortrait() + '</div>' +
      '</section>' +

      '<section class="sec reveal">' +
        '<h2 class="sec-title">对应颜色 <span>Color</span></h2>' +
        '<div class="color-bar" style="background:linear-gradient(90deg,' + sin.color + ' 0%,' + sin.colorDeep + ' 70%, #050302 100%)"></div>' +
        '<div class="color-tags"><span>' + sin.color.toUpperCase() + '</span><span>' + sin.colorDeep.toUpperCase() + '</span></div>' +
      '</section>' +

      '<section class="sec reveal">' +
        '<h2 class="sec-title">概述 <span>Overview</span></h2>' +
        '<p class="intro-text">' + sin.intro + '</p>' +
      '</section>' +

      '<section class="sec reveal">' +
        '<h2 class="sec-title">所附之魔 <span>Demon</span></h2>' +
        '<div class="demon-head"><div class="demon-name">' + sin.demon + '<small>' + sin.demonEn + '</small></div></div>' +
        '<p class="demon-intro">' + sin.demonIntro + '</p>' +
        '<div class="theology"><div class="theology-label">神学论述 · THEOLOGIA</div><p>' + sin.demonTheology + '</p></div>' +
      '</section>' +

      '<section class="sec reveal">' +
        '<h2 class="sec-title">对应美德 <span>Virtue</span></h2>' +
        '<div class="virtue-card">' +
          '<div class="virtue-name">' + sin.virtue + '<small>' + sin.virtueLatin + '</small></div>' +
          '<p>' + sin.virtueIntro + '</p>' +
        '</div>' +
        '<div class="virtues-strip">' + virtues + '</div>' +
      '</section>' +

      '<section class="sec reveal">' +
        '<h2 class="sec-title">象征与刑罚 <span>Symbols & Punishment</span></h2>' +
        '<div class="cards">' +
          '<div class="card"><div class="card-label">象征动物</div><div class="card-value">' + sin.animal + '</div><div class="card-sub">中世纪寓言中常以此兽形象呈现本罪。</div></div>' +
          '<div class="card"><div class="card-label">象征之物</div><div class="card-value">' + sin.symbols + '</div><div class="card-sub">对应此罪的器物与纹章。</div></div>' +
          '<div class="card"><div class="card-label">诱惑低语</div><div class="card-value-sm">' + sin.temptation + '</div><div class="card-sub">此罪在人心深处最常听见的声音。</div></div>' +
          '<div class="card"><div class="card-label">炼狱之刑</div><div class="card-value-sm">' + sin.punishment + '</div><div class="card-sub">但丁《神曲》中所载的对应刑罚。</div></div>' +
        '</div>' +
      '</section>' +

      '<blockquote class="quote reveal"><p>' + sin.quote + '</p><span class="src">' + sin.quoteSrc + '</span></blockquote>' +
      '<div class="temptation reveal">' + sin.temptation + '</div>';

    document.getElementById('content').innerHTML = html;

    // 逐段入场
    var kids = document.getElementById('content').children;
    for (var k = 0; k < kids.length; k++) {
      kids[k].style.setProperty('--d', (0.12 + k * 0.1) + 's');
    }
  }

  render();

  // ---- 入场：揭开幕布 ----
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('ready');
    });
  });

  // ---- 返回：反向虹膜 ----
  document.getElementById('backBtn').addEventListener('click', function () {
    var d = Math.max(window.innerWidth, window.innerHeight) * 1.6;
    var cover = document.createElement('div');
    cover.style.cssText =
      'position:fixed;left:50%;top:50%;width:' + d + 'px;height:' + d + 'px;' +
      'margin:-' + (d / 2) + 'px 0 0 -' + (d / 2) + 'px;border-radius:50%;z-index:70;' +
      'background:radial-gradient(circle at 50% 50%,' + sin.color + ' 0%,' + sin.colorDeep + ' 45%,#060405 85%);' +
      'transform:scale(0);transition:transform .62s cubic-bezier(.7,0,.25,1);';
    document.body.appendChild(cover);
    requestAnimationFrame(function () { cover.style.transform = 'scale(1)'; });
    setTimeout(function () { window.location.href = 'index.html'; }, 640);
  });

  // ---- 火星粒子（轻量） ----
  var canvas = document.getElementById('embers');
  var ctx = canvas.getContext('2d');
  var W, H, embers = [];
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function make() {
    embers = [];
    var n = Math.min(40, Math.floor(W * H / 40000));
    for (var i = 0; i < n; i++) {
      embers.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.6 + 0.4,
        vy: Math.random() * 0.3 + 0.06,
        ph: Math.random() * Math.PI * 2
      });
    }
  }
  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < embers.length; i++) {
      var p = embers[i];
      p.y -= p.vy; p.ph += 0.01; p.x += Math.sin(p.ph) * 0.12;
      if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
      var a = 0.1 + 0.18 * (0.5 + 0.5 * Math.sin(performance.now() / 500 + p.ph * 4));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(230,176,90,' + a + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  resize(); make(); draw();
  window.addEventListener('resize', function () { resize(); make(); });
})();
