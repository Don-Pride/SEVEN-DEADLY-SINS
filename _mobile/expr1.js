(() => {
  const out = { vw: innerWidth, vh: innerHeight, scrollW: document.documentElement.scrollWidth };
  const over = [];
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed') return;
    if (r.right > innerWidth + 0.5 || r.left < -0.5) {
      over.push({
        cls: (el.className && el.className.toString().slice(0, 40)) || el.tagName,
        left: +r.left.toFixed(1), right: +r.right.toFixed(1), w: +r.width.toFixed(1), pos: cs.position
      });
    }
  });
  out.overflow = over.slice(0, 15);
  const q = s => document.querySelector(s);
  const info = (sel) => {
    const el = q(sel);
    if (!el) return null;
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    return { fs: cs.fontSize, ls: cs.letterSpacing, x: +r.left.toFixed(1), y: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
  };
  out.hint = info('.hint');
  out.hintEn = info('.hint-en');
  out.credit = info('.credit');
  out.eyebrow = info('.eyebrow');
  out.title = info('.title');
  out.stage = info('.stage');
  out.node = info('.node');
  out.toggle = info('#purgatoryToggle');
  out.card = info('#introCard');
  return out;
})()
