(async () => {
  const b = document.querySelector('.plate-img');
  b.scrollIntoView({ block: 'center' });
  await new Promise(s => setTimeout(s, 300));
  b.click();
  await new Promise(s => setTimeout(s, 700));
  const v = document.querySelector('.plate-viewer');
  const r = {};
  if (v) {
    const vr = v.getBoundingClientRect();
    const img = v.querySelector('img');
    const ir = img.getBoundingClientRect();
    const x = v.querySelector('.pv-x');
    r.viewer = { open: v.className, x: +vr.left.toFixed(1), w: +vr.width.toFixed(1), h: +vr.height.toFixed(1) };
    r.img = { x: +ir.left.toFixed(1), y: +ir.top.toFixed(1), w: +ir.width.toFixed(1), h: +ir.height.toFixed(1) };
    r.closeBtn = x ? { x: +x.getBoundingClientRect().left.toFixed(1), y: +x.getBoundingClientRect().top.toFixed(1) } : null;
  } else {
    r.viewer = null;
  }
  return r;
})()
