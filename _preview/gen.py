import math

CX, CY, R = 50.0, 50.0, 42.0

def pt(cx, cy, ang, r):
    a = math.radians(ang)
    return (cx + r*math.cos(a), cy + r*math.sin(a))

def f(v):
    return ('%.2f' % v).rstrip('0').rstrip('.')

def poly(pts):
    return 'M' + ' L'.join('%s %s' % (f(x), f(y)) for x, y in pts) + ' Z'

# 倒置星：一个角朝正下方（y 轴向下 -> 90°）
base = [pt(CX, CY, 90 + i*72, R) for i in range(5)]
star = [base[0], base[2], base[4], base[1], base[3]]     # {5/2} 跳点

# bbox 居中
xs = [p[0] for p in star]; ys = [p[1] for p in star]
dx = -(min(xs)+max(xs))/2 + 50
dy = -(min(ys)+max(ys))/2 + 50
star = [(x+dx, y+dy) for x, y in star]
cx, cy = CX+dx, CY+dy

# 内五边形：半径 = R/φ²，顶点与星尖错开 36°，倒立星的五边形尖朝上（270°）
RI = R * 0.381966
penta_out = [pt(cx, cy, 270 + i*72, RI) for i in range(5)]
penta_in  = [pt(cx, cy, 270 + i*72, RI*0.80) for i in range(5)]

d_star  = poly(star)
d_pout  = poly(penta_out)
d_pin   = poly(penta_in)

print('cx=%.2f cy=%.2f' % (cx, cy))
print('star :', d_star)
print('penta:', d_pout)

variants = [
  dict(name='A · 线刻五芒星', latin='PENTACULUM LINEARE',
       note='一笔连成的五芒星，线宽 3.5 与傲慢／懒惰同族，交叉处保留尖角。最贴站内的线刻语言，但交叉线在小尺寸会黏成一团。',
       svg='<g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"><path d="%s"/></g>' % d_star),
  dict(name='B · 封印五芒星', latin='SIGILLUM PENTANGULI',
       note='A 外加一圈细环（r46，线宽 1.6、六成透明）。护符／封印感最强，也更像「异端印记」；代价是图形更满。',
       svg='<g fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"><circle cx="50" cy="50" r="46" stroke-width="1.6" opacity=".6"/><path d="%s" stroke-width="3"/></g>' % d_star),
  dict(name='C · 实心倒五角星', latin='STELLA SOLIDA',
       note='整块实心，无内部结构。28px 最清楚、与贪婪／嫉妒同属实心族；但「五芒星」的符号义变弱，容易被当成普通星标。',
       svg='<g fill="currentColor" stroke="none"><path fill-rule="evenodd" d="%s"/></g>' % d_star),
  dict(name='D · 实心倒星 · 内嵌五边形刻线', latin='STELLA SCULPTA',
       note='在 C 的实心块上以 evenodd 刻出一道内五边形细环。兼顾实心的小尺寸可读性与五芒星的符号义，但 28px 下刻线会消失。',
       svg='<g fill="currentColor" stroke="none"><path fill-rule="evenodd" d="%s %s %s"/></g>' % (d_star, d_pout, d_pin)),
]

tiles = ''
for v in variants:
    tiles += '''
    <section class="card">
      <div class="big"><svg viewBox="0 0 100 100">%s</svg></div>
      <div class="meta">
        <h2>%s</h2><div class="lat">%s</div><p>%s</p>
      </div>
      <div class="sizes">
        <div class="sz"><svg viewBox="0 0 100 100" width="96" height="96">%s</svg><span>96</span></div>
        <div class="sz"><svg viewBox="0 0 100 100" width="56" height="56">%s</svg><span>56</span></div>
        <div class="sz"><svg viewBox="0 0 100 100" width="40" height="40">%s</svg><span>40</span></div>
        <div class="sz"><svg viewBox="0 0 100 100" width="28" height="28">%s</svg><span>28 · 星盘节点</span></div>
      </div>
    </section>''' % (v['svg'], v['name'], v['latin'], v['note'], v['svg'], v['svg'], v['svg'], v['svg'])

html = '''<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0a0705;color:#e7dcc3;font-family:'Songti SC','SimSun',serif;
       background-image:radial-gradient(70% 50% at 50% 0%,#2e100d,transparent 70%);padding:54px 60px 58px}
  h1{font-size:26px;letter-spacing:.22em;font-weight:400}
  .sub{font-family:Georgia,serif;font-size:10.5px;letter-spacing:.42em;color:#8c7a5c;margin-top:10px;text-transform:uppercase}
  .rule{height:1px;background:linear-gradient(90deg,rgba(200,162,75,.45),transparent);margin:24px 0 30px}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:26px}
  .card{border:1px solid rgba(200,162,75,.20);background:linear-gradient(180deg,#14100b,#0b0805);padding:20px 18px 16px;display:flex;flex-direction:column}
  .big{display:grid;place-items:center;height:196px;border-bottom:1px solid rgba(200,162,75,.10);
       background:radial-gradient(58% 58% at 50% 50%,rgba(232,86,74,.10),transparent 72%)}
  .big svg{width:168px;height:168px;color:#e7dcc3;filter:drop-shadow(0 0 22px rgba(232,86,74,.16))}
  .meta{padding:15px 2px 12px}
  .meta h2{font-size:14.5px;letter-spacing:.12em;font-weight:400}
  .lat{font-family:Georgia,serif;font-size:8.5px;letter-spacing:.24em;color:#a8865a;margin-top:7px}
  .meta p{font-size:12px;line-height:1.85;color:#9a8f7a;margin-top:10px;letter-spacing:.02em}
  .sizes{display:flex;align-items:flex-end;gap:14px;margin-top:auto;padding-top:13px;border-top:1px solid rgba(200,162,75,.10)}
  .sz{display:flex;flex-direction:column;align-items:center;gap:6px}
  .sz svg{color:#e7dcc3}
  .sz span{font-family:Georgia,serif;font-size:8.5px;letter-spacing:.12em;color:#6b6352;white-space:nowrap}
  .foot{margin-top:26px;font-size:11.5px;color:#6b6352;letter-spacing:.05em;line-height:1.8}
</style></head><body>
  <h1>愤怒 · IRA —— 倒置五芒星 · 图标方案</h1>
  <div class="sub">Septem Peccata Capitalia &nbsp;·&nbsp; Quinque Stellae Inversae</div>
  <div class="rule"></div>
  <div class="grid">%%TILES%%</div>
  <div class="foot">同一形体的四种处理：A／B 描线族，C／D 实心族。每格下排为实际显示尺寸，最右 28px 即首页星盘节点的图标大小——以此档的可读性作为最终判据。</div>
</body></html>'''.replace('%%TILES%%', tiles)

open('board.html', 'w', encoding='utf-8').write(html)
print('board ok')
