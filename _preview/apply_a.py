# -*- coding: utf-8 -*-
"""把 icon-wrath 替换为 A 方案：线刻倒置五芒星（{5/2} 一笔连成，描边填 none）"""
import math, re, os, glob

CX = CY = 50.0
R = 42.0

def pt(ang, r, cx=CX, cy=CY):
    a = math.radians(ang)
    return (cx + r * math.cos(a), cy + r * math.sin(a))

def fmt(v):
    return ('%.2f' % v).rstrip('0').rstrip('.')

# 倒置：一角朝正下方（y 轴向下 => 90°）
base = [pt(90 + i * 72, R) for i in range(5)]
zig = [base[0], base[2], base[4], base[1], base[3]]

xs = [p[0] for p in zig]
ys = [p[1] for p in zig]
dx = -(min(xs) + max(xs)) / 2 + 50
dy = -(min(ys) + max(ys)) / 2 + 50
zig = [(x + dx, y + dy) for x, y in zig]

d = 'M' + ' L'.join('%s %s' % (fmt(x), fmt(y)) for x, y in zig) + ' Z'

NEW = ('      <symbol id="icon-wrath" viewBox="0 0 100 100">'
       '<g fill="none" stroke="currentColor" stroke-width="3.5" '
       'stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10">\n'
       '        <path d="%s"/>\n'
       '        </g></symbol>') % d

print('d =', d)
print('bbox x %.2f..%.2f  y %.2f..%.2f' % (min(p[0] for p in zig), max(p[0] for p in zig),
                                            min(p[1] for p in zig), max(p[1] for p in zig)))

pat = re.compile(r'[ \t]*<symbol id="icon-wrath".*?</symbol>', re.S)
done, skip = [], []
for f in sorted(glob.glob('*.html')):
    s = open(f, 'r', encoding='utf-8').read()
    if 'id="icon-wrath"' not in s:
        skip.append(f)
        continue
    n = len(pat.findall(s))
    s2 = pat.sub(NEW, s)
    if n != 1:
        print('!! %s 命中 %d 次，跳过' % (f, n))
        continue
    open(f, 'w', encoding='utf-8').write(s2)
    done.append(f)

print('替换:', ', '.join(done))
print('无此图标:', ', '.join(skip) if skip else '无')
