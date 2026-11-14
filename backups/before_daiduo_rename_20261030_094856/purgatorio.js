/* ============================================================
   七宗罪 · 炼狱山层页逻辑
   神曲炼狱篇 · 古斯塔夫·多雷木刻版画风格
   ============================================================ */

(function () {
  'use strict';

  // ---- 解析当前层 ----
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
  document.title = '炼狱 · ' + sin.name + ' — 七宗罪';

  var bootSigil = document.getElementById('bootSigil');
  bootSigil.setAttribute('href', '#icon-' + sin.id);

  var text = PURGATORIO[sin.id] || '';

  // ---- 多雷风木刻插图构件 ----

  // 披袍罪魂（原点位于足底）
  function soul(x, y, s, rot) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ') rotate(' + rot + ')" fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.5" stroke-width="1.4">' +
      '<path d="M0 -52 C12 -47 14 -35 13 -26 C8 -20 -8 -20 -13 -26 C-14 -35 -12 -47 0 -52 Z"/>' +
      '<circle cx="0" cy="-31" r="7"/>' +
      '<path d="M-14 -20 C -22 -4 -18 6 -11 0 L11 0 C18 6 22 -4 14 -20 Z"/>' +
    '</g>';
  }

  // 火焰
  function flame(x, y, s, rot) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ') rotate(' + rot + ')" fill="none" stroke="#e7dcc3" stroke-opacity="0.75" stroke-width="1.6">' +
      '<path d="M0 4 C -8 -8 -11 -20 -4 -34 C 1 -22 4 -14 10 -7 C 7 -3 4 2 0 4 Z"/>' +
    '</g>';
  }

  // 果树（暴食层）
  function tree(x, y, s) {
    return '<g transform="translate(' + x + ',' + y + ') scale(' + s + ')" fill="none" stroke="#e7dcc3" stroke-opacity="0.6" stroke-width="2">' +
      '<path d="M0 0 L -6 -90 M0 0 L 8 -96 M0 -60 L -40 -110 M0 -72 L 42 -116" stroke-linecap="round"/>' +
      '<g fill="#e7dcc3" fill-opacity="0.75" stroke="none">' +
        '<circle cx="-40" cy="-118" r="7"/><circle cx="-18" cy="-126" r="7"/><circle cx="4" cy="-118" r="7"/>' +
        '<circle cx="42" cy="-124" r="7"/><circle cx="24" cy="-134" r="6"/><circle cx="-30" cy="-136" r="6"/>' +
      '</g>' +
    '</g>';
  }

  // 神圣光束
  function rays() {
    var s = '';
    for (var i = -4; i <= 4; i++) {
      var x = 380 + i * 90;
      s += '<polygon points="380,140 ' + x + ',978 ' + (x + 70) + ',978" fill="#e7dcc3" opacity="' + (0.05 - Math.abs(i) * 0.006).toFixed(3) + '"/>';
    }
    return s;
  }

  // 版画云霭
  function clouds() {
    var s = '';
    for (var r = 0; r < 3; r++) {
      var y = 150 + r * 55;
      var op = 0.05 - r * 0.012;
      var start = -40 + (r % 2) * 70;
      for (var x = start; x < 820; x += 112) {
        s += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + (62 - r * 8) + '" ry="' + (20 - r * 3) + '" fill="#e7dcc3" opacity="' + op.toFixed(3) + '"/>';
      }
    }
    return s;
  }

  // 岩层地面
  function ground() {
    return '<g fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.28" stroke-width="1.4">' +
      '<path d="M22 800 L150 772 L300 796 L460 770 L600 794 L738 772 L738 978 L22 978 Z"/>' +
      '<path d="M22 856 L200 838 L380 858 L560 836 L738 852 L738 978 L22 978 Z" fill="#120d08"/>' +
      '<path d="M22 916 L240 900 L420 918 L600 900 L738 914 L738 978 L22 978 Z" fill="#080604"/>' +
    '</g>';
  }

  // ---- 七层场景 ----
  var SCENES = {
    // 第一层 傲慢：背巨石，看地面的谦卑浮雕
    pride:
      '<g fill="none" stroke="#e7dcc3" stroke-opacity="0.32" stroke-width="1.3">' +
        '<path d="M84 894 q 26 -10 52 0 q 26 -10 52 0 q 26 -10 52 0"/>' +
        '<path d="M424 894 q 26 -10 52 0 q 26 -10 52 0 q 26 -10 52 0"/>' +
      '</g>' +
      '<ellipse cx="250" cy="800" rx="42" ry="30" fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.5" stroke-width="1.5"/>' +
      '<ellipse cx="420" cy="788" rx="48" ry="33" fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.5" stroke-width="1.5"/>' +
      '<ellipse cx="580" cy="806" rx="36" ry="26" fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.5" stroke-width="1.5"/>' +
      soul(256, 880, 1.7, -18) + soul(424, 876, 1.9, 8) + soul(578, 884, 1.5, -10),

    // 第二层 嫉妒：眼皮被缝，彼此倚靠
    envy:
      '<rect x="120" y="790" width="520" height="28" fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.4" stroke-width="1.2"/>' +
      soul(170, 880, 1.6, -6) + soul(290, 886, 1.6, 5) + soul(410, 882, 1.6, -4) + soul(530, 886, 1.6, 6) +
      '<g fill="none" stroke="#e7dcc3" stroke-opacity="0.55" stroke-width="1.2">' +
        '<path d="M158 806 h 24 M278 806 h 24 M398 806 h 24 M518 806 h 24"/>' +
      '</g>',

    // 第三层 暴怒：浓烟中摸索前行
    wrath:
      '<g fill="#0a0705" stroke="#e7dcc3" stroke-opacity="0.12" stroke-width="1">' +
        '<ellipse cx="180" cy="360" rx="150" ry="90"/>' +
        '<ellipse cx="420" cy="300" rx="180" ry="110"/>' +
        '<ellipse cx="640" cy="380" rx="140" ry="90"/>' +
        '<ellipse cx="300" cy="520" rx="170" ry="95"/>' +
        '<ellipse cx="560" cy="520" rx="160" ry="95"/>' +
        '<ellipse cx="380" cy="700" rx="200" ry="120"/>' +
      '</g>' +
      soul(250, 880, 1.7, 0) + soul(420, 888, 1.8, 0) + soul(580, 882, 1.6, 0) +
      '<g fill="none" stroke="#e7dcc3" stroke-opacity="0.45" stroke-width="1.3">' +
        '<path d="M232 832 L204 800 M244 830 L274 800"/>' +
        '<path d="M400 838 L372 806 M412 836 L442 806"/>' +
        '<path d="M562 832 L534 800 M574 830 L604 800"/>' +
      '</g>',

    // 第四层 怠惰：不停奔跑
    sloth:
      '<path d="M22 900 C 180 860 420 940 738 860" fill="none" stroke="#e7dcc3" stroke-opacity="0.3" stroke-width="1.4"/>' +
      '<g fill="none" stroke="#e7dcc3" stroke-opacity="0.35" stroke-width="1.2">' +
        '<path d="M140 780 h 70 M120 800 h 60"/>' +
        '<path d="M380 760 h 70 M360 780 h 60"/>' +
        '<path d="M600 790 h 70 M580 810 h 60"/>' +
      '</g>' +
      soul(240, 872, 1.7, -24) + soul(420, 866, 1.8, -20) + soul(600, 878, 1.6, -26),

    // 第五层 贪婪：伏地、手脚被绑
    greed:
      soul(200, 902, 1.6, 90) + soul(360, 908, 1.7, 90) + soul(520, 902, 1.6, 90) +
      '<g fill="none" stroke="#e7dcc3" stroke-opacity="0.5" stroke-width="1.2">' +
        '<path d="M180 902 L220 902 M340 908 L380 908 M500 902 L540 902"/>' +
        '<path d="M196 880 L204 884 M196 896 L204 892 M216 880 L208 884 M216 896 L208 892"/>' +
        '<path d="M356 886 L364 890 M356 902 L364 898 M376 886 L368 890 M376 902 L368 898"/>' +
        '<path d="M516 880 L524 884 M516 896 L524 892 M536 880 L528 884 M536 896 L528 892"/>' +
      '</g>',

    // 第六层 暴食：瘦骨嶙峋，果树清水旁
    gluttony:
      tree(560, 890, 1.6) +
      '<path d="M22 950 C 140 930 240 930 340 950" fill="none" stroke="#e7dcc3" stroke-opacity="0.4" stroke-width="2"/>' +
      '<path d="M40 962 C 150 946 240 946 320 962" fill="none" stroke="#e7dcc3" stroke-opacity="0.25" stroke-width="1.4"/>' +
      soul(180, 880, 1.5, 0) + soul(290, 888, 1.5, 0) + soul(390, 884, 1.45, 0),

    // 第七层 色欲：火墙中行走
    lust:
      '<g fill="none" stroke="#e7dcc3" stroke-opacity="0.7" stroke-width="1.6">' +
        flame(300, 900, 3.4, 0) + flame(360, 900, 3.8, 0) + flame(420, 900, 3.5, 0) +
        flame(330, 760, 3.2, 0) + flame(400, 760, 3.6, 0) +
        flame(360, 620, 3.4, 0) + flame(300, 520, 3.0, 0) + flame(420, 520, 3.0, 0) +
      '</g>' +
      soul(280, 892, 1.7, 0) + soul(380, 892, 1.8, 0) + soul(470, 892, 1.6, 0)
  };

  // ---- 组装版画 ----
  function buildEngraving(id) {
    var defs =
      '<defs>' +
        '<radialGradient id="pSky" cx="50%" cy="6%" r="72%">' +
          '<stop offset="0%" stop-color="#f0d79a" stop-opacity="0.6"/>' +
          '<stop offset="40%" stop-color="#b8a06a" stop-opacity="0.18"/>' +
          '<stop offset="100%" stop-color="#0a0705" stop-opacity="0"/>' +
        '</radialGradient>' +
      '</defs>';
    var frame =
      '<rect x="12" y="12" width="736" height="976" fill="none" stroke="#b8a06a" stroke-opacity="0.5" stroke-width="2"/>' +
      '<rect x="22" y="22" width="716" height="956" fill="none" stroke="#b8a06a" stroke-opacity="0.2" stroke-width="1"/>';
    var sky = '<rect x="22" y="22" width="716" height="956" fill="url(#pSky)"/>';

    return '<svg class="engraving" viewBox="0 0 760 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">' +
      defs + frame + sky + rays() + clouds() + ground() + (SCENES[id] || '') +
    '</svg>';
  }

  // ---- 渲染内容 ----
  function render() {
    var html =
      '<section class="pg-hero reveal">' +
        '<div class="pg-kicker">炼狱篇 · PURGATORIO · 第' + CN_NUM[sin.index - 1] + '层</div>' +
        '<h1 class="pg-title">' + sin.name + '</h1>' +
        '<div class="pg-latin">' + sin.latin + '</div>' +
      '</section>' +

      '<section class="pg-plate reveal">' +
        '<figure class="plate">' +
          buildEngraving(sin.id) +
          '<figcaption>TERRAZZA ' + ROMAN[sin.index - 1] + ' · 多雷木刻 · ' + sin.latin.toUpperCase() + '</figcaption>' +
        '</figure>' +
      '</section>' +

      '<section class="pg-text reveal">' +
        '<p><span class="opening">◆</span>' + text + '</p>' +
      '</section>';

    document.getElementById('content').innerHTML = html;

    var kids = document.getElementById('content').children;
    for (var k = 0; k < kids.length; k++) {
      kids[k].style.setProperty('--d', (0.1 + k * 0.12) + 's');
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
      'margin:-' + (d / 2) + 'px 0 0 -' + (d / 2) + 'px;border-radius:50%;z-index:80;' +
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
