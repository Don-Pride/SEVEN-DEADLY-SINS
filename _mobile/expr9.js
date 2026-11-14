(async () => {
  window.scrollTo(0, document.documentElement.scrollHeight);
  await new Promise(s => setTimeout(s, 700));
  const info = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { y: +r.top.toFixed(1), h: +r.height.toFixed(1), bottom: +r.bottom.toFixed(1) };
  };
  return {
    scrollY: window.scrollY, vh: innerHeight,
    pager: info('.pager'), footer: info('.site-footer'), rail: info('#rail'),
    lastText: (document.querySelector('.site-footer p') || {}).innerText
  };
})()
