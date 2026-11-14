(async () => {
  const r = {};
  const rng = document.createRange();
  const m = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    rng.selectNodeContents(el);
    const rr = rng.getBoundingClientRect();
    return {
      contentW: +rr.width.toFixed(1), left: +rr.left.toFixed(1), right: +rr.right.toFixed(1),
      boxW: +el.getBoundingClientRect().width.toFixed(1)
    };
  };
  r.hint = m('.hint');
  r.hintEn = m('.hint-en');
  r.credit = m('.credit');
  r.eyebrow = m('.eyebrow');
  r.cinzel = document.fonts.check('12px Cinzel');
  r.songti = document.fonts.check('12px "Songti SC"');

  document.getElementById('purgatoryToggle').click();
  await new Promise(s => setTimeout(s, 800));

  const p = document.getElementById('purgatory');
  const pr = p.getBoundingClientRect();
  r.panel = { x: +pr.left.toFixed(1), w: +pr.width.toFixed(1), h: +pr.height.toFixed(1) };
  r.bodyClass = document.body.className;
  r.scrimOpacity = getComputedStyle(document.getElementById('purgatoryScrim')).opacity;
  r.overflowY = getComputedStyle(document.body).overflow;
  const first = p.querySelector('.level-bar');
  const fr = first.getBoundingClientRect();
  r.firstBar = { w: +fr.width.toFixed(1), left: +fr.left.toFixed(1), right: +fr.right.toFixed(1) };
  const cn = first.querySelector('.cn'), la = first.querySelector('.latin');
  r.cnW = +cn.getBoundingClientRect().width.toFixed(1);
  r.latinW = +la.getBoundingClientRect().width.toFixed(1);
  return r;
})()
