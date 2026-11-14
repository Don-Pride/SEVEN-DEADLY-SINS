(() => {
  const out = { vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth };
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    return {
      display: cs.display, x: +r.left.toFixed(1), y: +r.top.toFixed(1),
      w: +r.width.toFixed(1), h: +r.height.toFixed(1), pos: cs.position
    };
  };
  out.rail = info('#rail');
  out.railCount = document.querySelectorAll('#rail a').length;
  out.railFirst = info('#rail a');
  out.nav = info('.sub-nav');
  out.back = info('.back');
  out.hero = info('.hero');
  out.heroTitle = info('.hero h1, .hero-title, .hero .name');
  out.plate = info('.plate');
  out.pager = info('.pager');
  out.footer = info('.site-footer');
  out.bodyPaddingBottom = getComputedStyle(document.body).paddingBottom;
  out.bootHidden = getComputedStyle(document.getElementById('boot')).opacity;
  const over = [];
  document.querySelectorAll('main *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.right > innerWidth + 1) {
      over.push({ tag: el.tagName, cls: (el.className && el.className.toString().slice(0, 30)), right: +r.right.toFixed(1) });
    }
  });
  out.overflow = over.slice(0, 10);
  return out;
})()
