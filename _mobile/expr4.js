(async () => {
  const plate = document.querySelector('.plate-sec') || document.querySelector('.plate');
  plate.scrollIntoView({ block: 'start' });
  await new Promise(s => setTimeout(s, 600));
  const r = {};
  const b = document.body.getBoundingClientRect();
  r.scrollY = window.scrollY;
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = getComputedStyle(el), rc = el.getBoundingClientRect();
    return { x: +rc.left.toFixed(1), y: +rc.top.toFixed(1), w: +rc.width.toFixed(1), h: +rc.height.toFixed(1), disp: cs.display };
  };
  r.plate = info('.plate');
  r.fig = info('.plate figure');
  r.caption = info('.plate figcaption');
  r.rail = info('#rail');
  r.scrollW = document.documentElement.scrollWidth;
  return r;
})()
