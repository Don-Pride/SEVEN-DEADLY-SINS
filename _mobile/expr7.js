(async () => {
  const r = {};
  const n = document.querySelectorAll('.node')[0];
  n.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  await new Promise(s => setTimeout(s, 500));
  const c = document.getElementById('introCard');
  const cr = c.getBoundingClientRect();
  r.card = {
    x: +cr.left.toFixed(1), y: +cr.top.toFixed(1), w: +cr.width.toFixed(1), h: +cr.height.toFixed(1),
    cls: c.className, opacity: getComputedStyle(c).opacity, inlineLeft: c.style.left, inlineTop: c.style.top
  };
  r.nodeActive = document.querySelectorAll('.node.is-active').length;
  r.cardText = c.innerText.replace(/\n+/g, ' | ');
  return r;
})()
