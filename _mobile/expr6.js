(async () => {
  const H = document.documentElement.scrollHeight;
  window.scrollTo(0, Math.round(H * 0.42));
  await new Promise(s => setTimeout(s, 700));
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: +r.top.toFixed(1), x: +r.left.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
  };
  return {
    docH: H, scrollY: window.scrollY,
    plate: info('.plate-sec'), plateImg: info('.plate-sec img'),
    card: info('.cards'), viewer: info('.plate-viewer'),
    scrollW: document.documentElement.scrollWidth
  };
})()
