/* ============================================================
   七宗罪 · 炼狱山 · 单层子页
   图版：古斯塔夫·多雷（Gustave Doré, 1832–1883）《神曲·炼狱篇》木刻插图，
        自 1870 年代 Bibliothèque Classique Illustrata 版扫描件裁出画心。
        多雷逝于 1883 年，作品已入公有领域；此处仅作学术与审美展示。
   每层配一幅对应台地的原版版画 + 该画所本的原句（l'incisione 下方题记所引）。
   ============================================================ */

(function () {
  'use strict';

  /* ---------------- 图版 ---------------- */

  var PLATES = {
    pride: {
      src: 'plates/pride.jpg',
      w: 780, h: 1004,
      alt: '多雷版画：炼狱第一层。特洛伊柱廊前的大理石浮雕上，图拉真皇帝俯身替一位寡妇伸冤；' +
           '但丁与维吉尔背身立在右侧岩坡，正俯看这块刻着「谦卑之例」的石壁。',
      verse: 'La miserelle infra tutti costoro<br>parea dicer: «Signor, fammi vendetta<br>del mio figliuol ch\'è morto, ond\'io m\'accoro».',
      ref: 'Purg. X, 82–84',
      inc: 'Pannemaker-Doms sc.'
    },

    envy: {
      src: 'plates/envy.jpg',
      w: 780, h: 1025,
      alt: '多雷版画：炼狱第二层。巨崖脚下，眼皮被铁线缝住的灵魂披着斗篷，彼此倚靠着坐满一地；' +
           '但丁与维吉尔立在人群中央，崖壁上密排的刻线压住整幅画面。',
      verse: 'Così li ciechi, a cui la roba falla,<br>stanno a\' perdoni a chieder lor bisogna,<br>e l\'uno il capo sopra l\'altro avvalla.',
      ref: 'Purg. XIII, 58–60',
      inc: 'Jonnard sc.'
    },
    wrath: {
      src: 'plates/wrath.jpg',
      w: 780, h: 1034,
      alt: '多雷版画：炼狱第三层。浓烟如柱在岩谷间翻涌，一个灵魂贴着崖壁摸索前行；' +
           '但丁与维吉尔立在高处，以衣袖掩住口鼻。',
      verse: '«Or tu chi se\', che il nostro fumo fendi,<br>e di noi parli pur come se tue<br>partissi ancor lo tempo per calendi?»',
      ref: 'Purg. XVI, 25–27',
      inc: 'Jonnard sc.'
    },
    sloth: {
      src: 'plates/sloth.jpg',
      w: 780, h: 1013,
      alt: '多雷版画：炼狱第四层。夜色里，一群灵魂排成行列沿崖边急行，其中一人伸手前指；' +
           '远处山脊上一轮低月刚从云层里透出，把海面与山棱照白。',
      verse: 'Ma questa sonnolenza mi fu tolta<br>subitamente da gente, che dopo<br>le nostre spalle a noi era già volta.',
      ref: 'Purg. XVIII, 88–90',
      inc: 'Jonnard sc.'
    },
    greed: {
      src: 'plates/greed.jpg',
      w: 780, h: 986,
      alt: '多雷版画：炼狱第五层。满地伏卧的灵魂面朝下、手足被缚，一层层向远处铺开；' +
           '但丁与维吉尔立在土丘上俯视，天光正把云层撕开一道亮口。',
      verse: 'Noi andavam co\' passi lenti e scarsi,<br>e io attentamente all\'ombra ch\'io sentia<br>pietosamente piangere e lagnarsi.',
      ref: 'Purg. XX, 16–18',
      inc: 'C. Laplante sc.'
    },
    gluttony: {
      src: 'plates/gluttony.jpg',
      w: 780, h: 1020,
      alt: '多雷版画：炼狱第六层。崖顶垂下结满果子的树枝，树下横着一块巨岩；' +
           '一个裹着斗篷的灵魂伏在岩上，右侧几个灵魂瘦得只剩骨架，眼窝深陷、肋骨根根可数；' +
           '但丁与维吉尔自左侧石阶旁观看。',
      verse: '«…Chi son quelle<br>due anime che là ti fanno scorta?<br>Non rimaner che tu non mi favelle».',
      ref: 'Purg. XXIII, 52–55',
      inc: 'Pannemaker-Doms sc.'
    },
    lust: {
      src: 'plates/lust.jpg',
      w: 780, h: 1001,
      alt: '多雷版画：炼狱第七层。火墙之前，赤裸的灵魂在火焰中行走、举手歌唱；' +
           '但丁与维吉尔立在左侧岩坡的暗影里，看着火光把石壁照红。',
      verse: 'E vidi spirti per la fiamma andando;<br>però ch\'io guardava a loro e a\' miei passi,<br>compartendo la vista a quando a quanto.',
      ref: 'Purg. XXV, 124–126',
      inc: 'Pannemaker-Doms sc.'
    },

    /* —— 山巅 · 伊甸园：两幅 —— */
    eden: {
      src: 'plates/eden.jpg',
      w: 780, h: 1014,
      no: 'TAVOLA VIII',
      canto: 'CANTO XXVIII',
      cap: '古林：乐园的入口',
      alt: '多雷版画：炼狱山顶的伊甸园。古老的森林密不透光，藤蔓与枝叶在画面正中垂落如帘；' +
           '但丁、维吉尔与斯塔提乌斯三人立在林间小径的左下，衣袍被树隙漏下的光染白，' +
           '路的尽头是一道溪水与被光照亮的芦苇。',
      verse: 'Già m\'avean trasportato i lenti passi<br>dentro all\'antica selva tanto, ch\'io<br>non poteva riveder onde i\' m\'entrassi.',
      ref: 'Purg. XXVIII, 22–24',
      inc: 'Pannemaker-Doms sc.'
    },
    eden2: {
      src: 'plates/eden2.jpg',
      w: 780, h: 1000,
      no: 'TAVOLA IX',
      canto: 'CANTO XXIX',
      cap: '二十四长老的圣行列',
      alt: '多雷版画：伊甸园中的圣行列。二十四位头戴百合花冠的长老披着白袍、两两成行地从林间走来；' +
           '左侧树影里立着六翼的活物，脚下是一道幽暗的溪水与芦苇，天顶缀着几点星。',
      verse: 'Sotto così bel ciel, così diverso<br>ventiquattro seniori, a due a due,<br>coronati venìan di fiordaliso.',
      ref: 'Purg. XXIX, 82–84',
      inc: 'J. Huyot sc.'
    }
  };

  /* ---------------- 元数据 ---------------- */

  var META = {
    pride: {
      no: 'TAVOLA I', canto: 'CANTO X–XII', cantoCn: '第十至十二歌', terrace: 'PRIMA TERRAZZA',
      cap: '大理石的谦卑之例',
      penalty: '背负巨石，俯身看路',
      note: '巨石压弯的脊背，是曾经不肯低下的头。'
    },
    envy: {
      no: 'TAVOLA II', canto: 'CANTO XIII–XV', cantoCn: '第十三至十五歌', terrace: 'SECONDA TERRAZZA',
      cap: '巨崖之下，缝眼者的行列',
      penalty: '铁线缝目，粗毛布相倚',
      note: '夺去「看」，才学会用爱心相靠。'
    },
    wrath: {
      no: 'TAVOLA III', canto: 'CANTO XV–XVII', cantoCn: '第十五至十七歌', terrace: 'TERZA TERRAZZA',
      cap: '浓烟中的摸索者',
      penalty: '浓烟蔽目，摸索而行',
      note: '烟呛住眼，正如怒气蒙住理智。'
    },
    sloth: {
      no: 'TAVOLA IV', canto: 'CANTO XVIII–XIX', cantoCn: '第十八至十九歌', terrace: 'QUARTA TERRAZZA',
      cap: '夜山脊上的奔者',
      penalty: '昼夜奔逐，不得停歇',
      note: '用不停的奔跑，治疗不肯起身的心。'
    },
    greed: {
      no: 'TAVOLA V', canto: 'CANTO XIX–XXII', cantoCn: '第十九至二十二歌', terrace: 'QUINTA TERRAZZA',
      cap: '伏地的贪婪者与挥霍者',
      penalty: '面伏于地，手足被缚',
      note: '曾把心贴在地上，如今以伏地学会仰望。'
    },
    gluttony: {
      no: 'TAVOLA VI', canto: 'CANTO XXII–XXIV', cantoCn: '第二十二至二十四歌', terrace: 'SESTA TERRAZZA',
      cap: '果树与消瘦的灵魂',
      penalty: '面对果实与清水，不得饮食',
      note: '在丰盛之前挨饿，才认得何为滋养。'
    },
    lust: {
      no: 'TAVOLA VII', canto: 'CANTO XXV–XXVII', cantoCn: '第二十五至二十七歌', terrace: 'SETTIMA TERRAZZA',
      cap: '火墙中行走的灵魂',
      penalty: '穿过火墙，以火炼净',
      note: '火灼热却净化——炼净的，是爱本身。'
    },
    eden: {
      no: 'TAVOLA VIII', canto: 'CANTO XXVIII–XXXIII', cantoCn: '第二十八至三十三歌',
      terrace: 'PARADISUS TERRESTRIS',
      cap: '古林：乐园的入口',
      penalty: '火墙之顶 · 古林与双河',
      note: '乐园不是终点，是人重新学会走路的地方。'
    }
  };

  /* ---------------- 山巅 · 伊甸园（不在七层之内） ---------------- */

  var EDEN = {
    id: 'eden',
    name: '伊甸园',
    latin: 'Paradisus Terrestris',
    color: '#d8c48a',
    colorDeep: '#2a2416',
    quote: '人类的根曾在此无罪；此地永远是春天，且结满果实。',
    quoteSrc: '《炼狱篇》第二十八歌 · 142–143',
    temptation: '「此处无风无雨，风与泉皆直出于上帝的意愿；两条河从同一处泉眼流出——' +
                '一条使人忘罪，一条使人记善。」',
    pullLabel: '伊甸园 · 双重的河',
    text: '石阶走到尽头，坡道忽然平了。松林稠密得看不见天，风从树梢一层层漏下来，' +
          '带着草木与湿土的气味。一道溪水横在山路上，水色深得发绿，两岸的芦苇被光照得发白。' +
          '对面的女子一边走一边采花，唱着歌——她叫玛特尔达。她说：这里曾是人类的家，' +
          '原罪之前的居所；此处不受四时与风雨的摆布，风与泉都直出于上帝的意愿。' +
          '两条河从同一处泉眼流出：忘川洗去罪的记忆，攸诺厄唤回善的记忆。' +
          '维吉尔在山门前卸下向导的职责，贝雅特丽齐在花雨与歌声里降临。' +
          '乐园不是终点，是人重新学会走路的地方。',
    remedyLabel: '炼狱的终点',
    remedyName: '山巅之境',
    remedyLatin: 'PARADISUS TERRESTRIS',
    remedyText: '伊甸园立在炼狱山的顶端，是亚当失去又由基督赎回的那座园子。但丁把它写成' +
                '一座没有季节更替的森林：风由天球推动，水从上帝的座前直落，因此这里既无' +
                '霜雪也无旱涝。它不是天堂，而是「做对了的人」可以停留的地方——罪已洗净，' +
                '德性尚未圆满；脚下的路到此为止，头上的路才刚刚打开。'
  };

  /* ---------------- 当前层 ---------------- */

  var id = document.body.getAttribute('data-level');
  var isEden = id === 'eden';
  var sin = null, idx = 0;

  if (isEden) {
    sin = EDEN;
  } else {
    for (var i = 0; i < SINS.length; i++) {
      if (SINS[i].id === id) { sin = SINS[i]; idx = i; break; }
    }
    if (!sin) { sin = SINS[0]; id = 'pride'; idx = 0; }
  }

  var meta = META[id];
  var plateInfo = PLATES[id];
  var virtue = VIRTUES[idx];
  var text = isEden ? EDEN.text : (PURGATORIO[id] || '');
  var numeral = isEden ? 'P' : ROMAN[idx];

  document.body.style.setProperty('--sin', sin.color);
  document.body.style.setProperty('--sin-deep', sin.colorDeep);
  document.title = isEden
    ? '炼狱 · 伊甸园 · 山巅 — 七宗罪'
    : '炼狱 · ' + sin.name + ' · 第' + CN_NUM[idx] + '层 — 七宗罪';

  /* ---------------- 目录顺序（山巅 → 山脚，与首页侧边栏一致） ---------------- */

  var NAV = ['eden', 'lust', 'gluttony', 'greed', 'sloth', 'wrath', 'envy', 'pride'];
  var pos = NAV.indexOf(id);

  function lv(key) {
    if (!key) return null;
    if (key === 'eden') return EDEN;
    for (var k = 0; k < SINS.length; k++) if (SINS[k].id === key) return SINS[k];
    return null;
  }

  var above = pos > 0 ? lv(NAV[pos - 1]) : null;      // 更上层（登山）
  var below = pos >= 0 && pos < NAV.length - 1 ? lv(NAV[pos + 1]) : null;  // 更下层（下山）

  var bootSigil = document.getElementById('bootSigil');
  if (bootSigil) bootSigil.setAttribute('href', '#icon-' + id);
  var navMark = document.getElementById('navMark');
  if (navMark) navMark.textContent = 'PURGATORIO · ' + meta.terrace;

  /* ---------------- 图版标记 ---------------- */

  function plateMarkup(key) {
    var p = PLATES[key] || plateInfo;
    var no = p.no || meta.no;
    var cap = p.cap || meta.cap;
    var can = p.canto || meta.canto;
    return '<button class="plate-img" type="button" data-plate="' + (key || id) + '"' +
        ' aria-label="放大查看' + (p.media || '版画') + '：' + cap + '">' +
        '<img class="engraving" src="' + p.src + '" alt="' + p.alt + '"' +
        ' width="' + p.w + '" height="' + p.h + '" decoding="async">' +
        '<span class="plate-mag" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">' +
            '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.4 15.4 L21 21"/>' +
            '<path d="M10.5 7.6 v5.8 M7.6 10.5 h5.8"/>' +
          '</svg>' +
        '</span>' +
      '</button>' +
      '<figcaption>' +
        '<div class="fc-row">' +
          '<span class="fc-no">' + no + ' · ' + can + '</span>' +
          '<span class="cap-cn">' + cap + '</span>' +
        '</div>' +
        '<p class="fc-verse">' + p.verse + '</p>' +
        '<div class="fc-row fc-foot">' +
          '<span class="fc-inc">' + (p.credit || 'G. Doré del. · ' + p.inc) + '</span>' +
          '<span class="fc-ref">' + p.ref + '</span>' +
        '</div>' +
      '</figcaption>';
  }

  /* ---------------- 组装 ---------------- */

  function render() {
    var prevLv = below, nextLv = above;
    var prevLabel = isEden ? '↓ 下山 · 回到第七层' : '↓ 下山 · 下一层';

    var html = '';

    html += '<section class="hero">' +
      '<div class="hero-numeral" aria-hidden="true">' + numeral + '</div>' +
      '<div class="hero-inner">' +
        '<div class="hero-kicker">PURGATORIO · ' + meta.terrace + ' · ' + meta.canto + '</div>' +
        '<h1 class="hero-title">' + sin.name + '</h1>' +
        '<div class="hero-latin">' + sin.latin + '</div>' +
        '<div class="hero-rule"><span>◆</span></div>' +
        '<p class="hero-epigraph">' + sin.quote + '</p>' +
        '<p class="hero-epigraph-src">' + sin.quoteSrc + '</p>' +
      '</div>' +
      '<div class="scroll-cue"><span>向下 · 入' + (isEden ? '园' : '山') + '</span><i></i></div>' +
    '</section>';

    html += '<section class="plate-sec">' +
      '<aside class="note note-l" aria-hidden="true">' +
        (isEden
          ? '<span class="v">PARADISUS</span><span class="d"></span><span class="k">伊甸园 · 山巅</span>'
          : '<span class="v">' + meta.terrace + '</span><span class="d"></span>' +
            '<span class="k">' + sin.latin.toUpperCase() + '</span>') +
      '</aside>' +

      '<figure class="plate reveal" id="plate">' + plateMarkup(id) + '</figure>' +

      '<aside class="note note-r" aria-hidden="true">' +
        '<span class="k">炼狱篇 · ' + (isEden ? '山巅' : '第' + CN_NUM[idx] + '层') + '</span>' +
        '<span class="d up"></span>' +
        '<span class="v">' + numeral + '</span>' +
      '</aside>' +
    '</section>';

    html += '<section class="canto">' +
      '<div class="canto-side reveal">' +
        '<span class="k">IL TESTO</span>' +
        '<span class="v">' + (isEden ? '乐园之记' : '净罚之文') + '</span>' +
        '<span class="s">' + meta.canto + '</span>' +
        '<span class="rule"></span>' +
        '<span class="k" style="color:var(--ink-faint)">' + meta.penalty + '</span>' +
      '</div>' +
      '<div class="canto-body reveal">' +
        '<p><span class="dropcap">' + text.charAt(0) + '</span>' + text.slice(1) + '</p>' +
        '<blockquote class="pull">' +
          '<p>' + sin.temptation + '</p>' +
          '<cite>' + (sin.pullLabel || sin.name + ' · 罪的形状') + '</cite>' +
        '</blockquote>' +
      '</div>' +
    '</section>';

    /* 第二图版：正文之后，单栏收窄居中（仅伊甸园 eden2） */
    if (isEden && PLATES.eden2) {
      html += '<section class="plate-sec is-solo">' +
        '<figure class="plate reveal" id="plate2">' + plateMarkup('eden2') + '</figure>' +
      '</section>';
    }

    if (isEden) {
      html += '<section class="remedy">' +
        '<div class="remedy-card reveal">' +
          '<div class="remedy-label">' + EDEN.remedyLabel + '</div>' +
          '<div class="remedy-name">' + EDEN.remedyName + '</div>' +
          '<div class="remedy-latin">' + EDEN.remedyLatin + '</div>' +
          '<p>' + EDEN.remedyText + '</p>' +
        '</div>' +
        '<dl class="facts reveal">' +
          '<div class="row"><dt>位置</dt><dd>炼狱山顶 · 原罪前的居所<span class="lat">LOCUS</span></dd></div>' +
          '<div class="row"><dt>篇次</dt><dd>第二十八至三十三歌<span class="lat">CANTO XXVIII–XXXIII</span></dd></div>' +
          '<div class="row"><dt>双河</dt><dd>忘川 Lethe · 攸诺厄 Eunoe<span class="lat">FLUMINA</span></dd></div>' +
          '<div class="row"><dt>交接</dt><dd>维吉尔于此退场，贝雅特丽齐接引<span class="lat">DUCES</span></dd></div>' +
        '</dl>' +
      '</section>';
    } else {
      html += '<section class="remedy">' +
        '<div class="remedy-card reveal">' +
          '<div class="remedy-label">对应的德性</div>' +
          '<div class="remedy-name">' + virtue.name + '</div>' +
          '<div class="remedy-latin">' + virtue.latin.toUpperCase() + ' · ' + virtue.en.toUpperCase() + '</div>' +
          '<p>' + sin.virtueIntro + '</p>' +
        '</div>' +
        '<dl class="facts reveal">' +
          '<div class="row"><dt>层级</dt><dd>第' + CN_NUM[idx] + '层<span class="lat">' + meta.terrace + '</span></dd></div>' +
          '<div class="row"><dt>篇次</dt><dd>' + meta.cantoCn + '<span class="lat">' + meta.canto + '</span></dd></div>' +
          '<div class="row"><dt>净罚</dt><dd>' + meta.penalty + '<span class="lat">POENA</span></dd></div>' +
          '<div class="row"><dt>德行</dt><dd>' + virtue.name + '<span class="lat">' + virtue.latin.toUpperCase() + '</span></dd></div>' +
        '</dl>' +
      '</section>';
    }

    html += '<nav class="pager" aria-label="上下层">' +
      (prevLv
        ? '<a class="prev" href="' + prevLv.id + '.html"><span class="dir">' + prevLabel + '</span>' +
          '<span class="nm">' + prevLv.name + '</span><span class="lat">' + prevLv.latin + '</span></a>'
        : '<a class="prev is-empty"><span class="dir">↓ 已至山脚</span><span class="nm">炼狱山门</span><span class="lat">IANUA</span></a>') +
      '<a class="home" href="index.html">炼狱山<br>七层之图</a>' +
      (nextLv
        ? '<a class="next" href="' + nextLv.id + '.html"><span class="dir">上一层 · 登山 ↑</span>' +
          '<span class="nm">' + nextLv.name + '</span><span class="lat">' + nextLv.latin + '</span></a>'
        : '<a class="next is-empty"><span class="dir">已出炼狱 ↑</span><span class="nm">升向星辰</span><span class="lat">STELLE</span></a>') +
    '</nav>';

    html += '<footer class="site-footer">' +
      '<p>Gustave Doré · 《神曲·炼狱篇》木刻插图 · Bibliothèque Classique Illustrata, 1870s</p>' +
      '<p class="cn">炼狱山 · ' + (isEden ? '山巅' : '第' + CN_NUM[idx] + '层') +
        ' · ' + sin.latin.toUpperCase() + '</p>' +
    '</footer>';

    document.getElementById('page').innerHTML = html;
  }

  function buildRail() {
    var rail = document.getElementById('rail');
    if (!rail) return;
    var h = '';
    for (var k = 0; k < NAV.length; k++) {
      var key = NAV[k];
      var item = lv(key);
      if (!item) continue;
      var mark, label;
      if (key === 'eden') {
        mark = 'P';
        label = '山巅 · 伊甸园 ' + item.latin;
      } else {
        var n = SINS.indexOf(item);
        mark = ROMAN[n];
        label = '第' + CN_NUM[n] + '层 ' + item.name;
      }
      h += '<a href="' + key + '.html" class="' + (key === id ? 'is-current' : '') + '"' +
        ' title="' + item.name + ' ' + item.latin + '" aria-label="' + label + '">' +
        '<span>' + mark + '</span></a>';
    }
    rail.innerHTML = h;
  }

  render();
  buildRail();

  if (location.hash.length > 1) {
    setTimeout(function () {
      var target = document.querySelector(location.hash);
      if (!target) return;
      var top = target.getBoundingClientRect().top + window.pageYOffset - 40;
      try { window.scrollTo({ top: top, behavior: 'instant' }); }
      catch (err) { window.scrollTo(0, top); }
      target.classList.add('in');
    }, 80);
  }

  /* ---------------- 图版放大 ---------------- */

  var viewer = null;

  function closeViewer() {
    if (!viewer) return;
    var v = viewer;
    viewer = null;
    v.classList.remove('is-open');
    document.body.classList.remove('is-viewing');
    setTimeout(function () { if (v.parentNode) v.parentNode.removeChild(v); }, 320);
  }

  function openViewer(key) {
    if (viewer) return;
    var p = PLATES[key] || plateInfo;
    var no = p.no || meta.no;
    var cap = p.cap || meta.cap;
    viewer = document.createElement('div');
    viewer.className = 'viewer';
    viewer.setAttribute('role', 'dialog');
    viewer.setAttribute('aria-modal', 'true');
    viewer.setAttribute('aria-label', cap + ' — ' + (p.media || '多雷版画'));
    viewer.innerHTML =
      '<figure class="viewer-inner">' +
        '<img src="' + p.src + '" alt="' + p.alt + '">' +
        '<figcaption><span class="v-no">' + no + '</span>' +
          '<span class="v-cap">' + cap + '</span>' +
          '<span class="v-ref">' + (p.credit || 'G. Doré del. · ' + p.inc) + ' · ' + p.ref + '</span>' +
        '</figcaption>' +
      '</figure>' +
      '<button class="viewer-x" type="button" aria-label="关闭">×</button>';
    document.body.appendChild(viewer);
    document.body.classList.add('is-viewing');
    requestAnimationFrame(function () { viewer.classList.add('is-open'); });
    var x = viewer.querySelector('.viewer-x');
    if (x) x.focus();
  }

  function viewerKey(btn) {
    return (btn && btn.getAttribute('data-plate')) || id;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.plate-img');
    if (btn) { e.preventDefault(); openViewer(viewerKey(btn)); return; }
    if (e.target.closest('.viewer-x') || e.target.classList.contains('viewer')) { closeViewer(); }
  });

  document.addEventListener('keydown', function (e) {
    if (!viewer) return;
    if (e.key === 'Escape' || e.key === 'Esc') closeViewer();
  });

  document.addEventListener('keydown', function (e) {
    if (viewer) return;
    var p = e.target.closest && e.target.closest('.plate-img');
    if (p && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openViewer(viewerKey(p)); }
  });

  /* ---------------- 动效 ---------------- */

  requestAnimationFrame(function () {
    requestAnimationFrame(function () { document.body.classList.add('ready'); });
  });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el, i) {
      el.style.transitionDelay = (i * 0.08) + 's';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  var progress = document.getElementById('progress');
  var plate = document.getElementById('plate');
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY || document.documentElement.scrollTop;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (progress) progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      if (plate) {
        var r = plate.getBoundingClientRect();
        var mid = r.top + r.height / 2 - window.innerHeight / 2;
        var shift = Math.max(-1, Math.min(1, mid / window.innerHeight)) * 14;
        plate.style.transform = 'translate3d(0,' + shift.toFixed(2) + 'px,0)';
      }
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#' || a.target === '_blank') return;
    if (!/\.html$/.test(href)) return;
    e.preventDefault();
    var d = Math.max(window.innerWidth, window.innerHeight) * 1.7;
    var cover = document.createElement('div');
    cover.style.cssText =
      'position:fixed;left:50%;top:50%;width:' + d + 'px;height:' + d + 'px;z-index:300;' +
      'margin:-' + (d / 2) + 'px 0 0 -' + (d / 2) + 'px;border-radius:50%;' +
      'background:radial-gradient(circle at 50% 50%,' + sin.color + ' 0%,' + sin.colorDeep + ' 46%,#060405 86%);' +
      'transform:scale(0);transition:transform .62s cubic-bezier(.7,0,.25,1);';
    document.body.appendChild(cover);
    requestAnimationFrame(function () { cover.style.transform = 'scale(1)'; });
    setTimeout(function () { window.location.href = href; }, 620);
  });

  var canvas = document.getElementById('embers');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, embers = [];
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    function make() {
      embers = [];
      var n = Math.min(48, Math.floor(W * H / 38000));
      for (var i = 0; i < n; i++) {
        embers.push({
          x: Math.random() * W, y: Math.random() * H,
          r: Math.random() * 1.5 + 0.4,
          vy: Math.random() * 0.3 + 0.05,
          ph: Math.random() * Math.PI * 2
        });
      }
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      var t = performance.now() / 1000;
      for (var i = 0; i < embers.length; i++) {
        var p = embers[i];
        p.y -= p.vy; p.ph += 0.01; p.x += Math.sin(p.ph) * 0.14;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        var a = 0.1 + 0.16 * (0.5 + 0.5 * Math.sin(t * 1.6 + p.ph * 4));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232,200,140,' + a.toFixed(3) + ')';
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize(); make(); draw();
    window.addEventListener('resize', function () { resize(); make(); });
  }

})();
