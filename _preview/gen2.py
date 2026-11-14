import math
CX, CY, R = 50.0, 50.0, 42.0

def pt(cx, cy, ang, r):
    a = math.radians(ang); return (cx + r*math.cos(a), cy + r*math.sin(a))
def f(v): return ('%.2f' % v).rstrip('0').rstrip('.')
def poly(pts): return 'M' + ' L'.join('%s %s' % (f(x), f(y)) for x, y in pts) + ' Z'

# --- 倒置：一角朝正下方 ---
base = [pt(CX, CY, 90 + i*72, R) for i in range(5)]
zig = [base[0], base[2], base[4], base[1], base[3]]        # 描线用 {5/2} 跳点

xs=[p[0] for p in zig]; ys=[p[1] for p in zig]
dx = -(min(xs)+max(xs))/2 + 50; dy = -(min(ys)+max(ys))/2 + 50
zig = [(x+dx, y+dy) for x,y in zig]
cx, cy = CX+dx, CY+dy

RI = R*0.381966          # 五边形/凹角半径
penta  = [pt(cx, cy, 270 + i*72, RI) for i in range(5)]
penta0 = [pt(cx, cy, 270 + i*72, RI*0.80) for i in range(5)]

# --- 实心倒五角星：十顶点（外尖 + 凹角交替）---
solid = []
for i in range(5):
    solid.append(pt(cx, cy, 90 + i*72, R))          # 外尖，自下方起逆时针
    solid.append(pt(cx, cy, 126 + i*72, RI))        # 凹角

d_zig    = poly(zig)
d_solid  = poly(solid)
d_penta  = poly(penta)
d_penta0 = poly(penta0)

print('zig  :', d_zig)
print('solid:', d_solid)

VAR = [
  dict(name='A · 线刻五芒星', latin='PENTACULUM LINEARE',
       note='一笔连成的五芒星，线宽 3.5 与傲慢／懒惰同族，交叉处保留尖角。最贴站内线刻语言；代价是 28px 下交叉线会黏成一团。',
       svg='<g fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"><path d="%s"/></g>' % d_zig),
  dict(name='B · 封印五芒星', latin='SIGILLUM PENTANGULI',
       note='A 外加一圈细环（r46、线宽 1.6、六成透明）。护符／封印感最强，更像「异端印记」；28px 下会糊成一个圆斑。',
       svg='<g fill="none" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"><circle cx="50" cy="50" r="46" stroke-width="1.6" opacity=".6"/><path d="%s" stroke-width="3"/></g>' % d_zig),
  dict(name='C · 实心倒五角星', latin='STELLA SOLIDA',
       note='十顶点实心块，无内部结构。28px 最清楚，与贪婪／嫉妒同属实心族；但只读成「倒过来的星」，五芒星的交叉语义弱。',
       svg='<g fill="currentColor" stroke="none"><path d="%s"/></g>' % d_solid),
  dict(name='D · 镂心五芒星', latin='STELLA CAVA',
       note='只留五个星臂，中段五边形镂空——即五芒星交叉线围出的那一圈「带」。符号义最准，与嫉妒／贪婪的负形镂空手法同源；28px 下臂会变细。',
       svg='<g fill="currentColor" stroke="none"><path fill-rule="evenodd" d="%s %s"/></g>' % (d_zig, d_penta)),
]

tiles=''
for v in VAR:
    tiles += '''
    <section class="card">
      <div class="big"><svg viewBox="0 0 100 100">%s</svg></div>
      <div class="meta"><h2>%s</h2><div class="lat">%s</div><p>%s</p></div>
      <div class="sizes">
        <div class="sz"><svg viewBox="0 0 100 100" width="96" height="96">%s</svg><span>96</span></div>
        <div class="sz"><svg viewBox="0 0 100 100" width="56" height="56">%s</svg><span>56</span></div>
        <div class="sz"><svg viewBox="0 0 100 100" width="40" height="40">%s</svg><span>40</span></div>
        <div class="sz"><svg viewBox="0 0 100 100" width="28" height="28">%s</svg><span>28 节点</span></div>
      </div>
    </section>''' % (v['svg'], v['name'], v['latin'], v['note'], v['svg'], v['svg'], v['svg'], v['svg'])

html = '''<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#0a0705;color:#e7dcc3;font-family:'Songti SC','SimSun',serif;
       background-image:radial-gradient(70% 46% at 50% 0%,#2e100d,transparent 72%);padding:52px 60px 44px}
  h1{font-size:25px;letter-spacing:.22em;font-weight:400}
  .sub{font-family:Georgia,serif;font-size:10px;letter-spacing:.42em;color:#8c7a5c;margin-top:10px;text-transform:uppercase}
  .rule{height:1px;background:linear-gradient(90deg,rgba(200,162,75,.45),transparent);margin:22px 0 28px}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;align-items:stretch}
  .card{border:1px solid rgba(200,162,75,.20);background:linear-gradient(180deg,#14100b,#0b0805);padding:18px 18px 14px;display:flex;flex-direction:column}
  .big{display:grid;place-items:center;height:190px;border-bottom:1px solid rgba(200,162,75,.10);
       background:radial-gradient(58% 58% at 50% 50%,rgba(232,86,74,.10),transparent 72%)}
  .big svg{width:164px;height:164px;color:#e7dcc3;filter:drop-shadow(0 0 22px rgba(232,86,74,.16))}
  .meta{padding:14px 2px 10px;flex:1}
  .meta h2{font-size:14px;letter-spacing:.1em;font-weight:400}
  .lat{font-family:Georgia,serif;font-size:8px;letter-spacing:.24em;color:#a8865a;margin-top:6px}
  .meta p{font-size:11.5px;line-height:1.8;color:#9a8f7a;margin-top:9px;letter-spacing:.02em}
  .sizes{display:flex;align-items:flex-end;gap:15px;padding-top:12px;border-top:1px solid rgba(200,162,75,.10)}
  .sz{display:flex;flex-direction:column;align-items:center;gap:6px}
  .sz svg{color:#e7dcc3}
  .sz span{font-family:Georgia,serif;font-size:8px;letter-spacing:.1em;color:#6b6352;white-space:nowrap}
  .foot{margin-top:22px;font-size:11px;color:#6b6352;letter-spacing:.05em;line-height:1.8}
</style></head><body>
  <h1>愤怒 · IRA —— 倒置五芒星 · 图标方案</h1>
  <div class="sub">Septem Peccata Capitalia &nbsp;·&nbsp; Quinque Stellae Inversae</div>
  <div class="rule"></div>
  <div class="grid">%%T%%</div>
  <div class="foot">同一形体的四种处理。下排为实际显示尺寸，最右 28px 即首页星盘节点的图标大小——以这一档的可读性作为最终判据。</div>
</body></html>'''.replace('%%T%%', tiles)

open('board.html','w',encoding='utf-8').write(html)
print('ok')
