(() => {
  const bar = document.querySelector('.color-bar');
  const out = [];
  let el = bar;
  for (let i = 0; i < 6 && el; i++) {
    const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
    out.push({
      tag: el.tagName, cls: (el.className || '').toString().slice(0, 30),
      x: +r.left.toFixed(1), w: +r.width.toFixed(1), right: +r.right.toFixed(1),
      padL: cs.paddingLeft, padR: cs.paddingRight, marR: cs.marginRight, disp: cs.display
    });
    el = el.parentElement;
  }
  return out;
})()
