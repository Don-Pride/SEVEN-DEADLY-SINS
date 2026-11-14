/* 轻量 CDP 驱动：设视口 → 打开页面 → 跑一段 JS → 截图。用于手机端验收。 */
const fs = require('fs');

const [, , url, W, H, out, exprFile] = process.argv;

(async () => {
  const list = await (await fetch('http://127.0.0.1:9222/json/list')).json();
  const page = list.find(t => t.type === 'page');
  if (!page) throw new Error('no page target');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  };
  const send = (method, params = {}) => new Promise((res) => {
    const i = ++id;
    pending.set(i, res);
    ws.send(JSON.stringify({ id: i, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: +W, height: +H, deviceScaleFactor: 2, mobile: true,
    screenWidth: +W, screenHeight: +H
  });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 2600));

  if (exprFile) {
    const expr = fs.readFileSync(exprFile, 'utf8');
    const r = await send('Runtime.evaluate', {
      expression: expr, returnByValue: true, awaitPromise: true
    });
    const v = r.result && r.result.result && r.result.result.value;
    console.log(JSON.stringify(v, null, 2));
    if (r.result && r.result.exceptionDetails) {
      console.log('EXCEPTION:', JSON.stringify(r.result.exceptionDetails.text));
    }
  }

  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  fs.writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log('saved', out);
  ws.close();
  process.exit(0);
})().catch(e => { console.error('ERR', e.message); process.exit(1); });
