from PIL import Image
im = Image.open('七宗罪_愤怒图标_倒置五芒星_方案预览.png')
w, h = im.size
# 四格大图标区域（2x 图）：卡宽约 (2880-2*120)/4
im.crop((1560, 240, 2100, 800)).save('_preview/z_C.png')
im.crop((2170, 240, 2740, 800)).save('_preview/z_D.png')
print(im.size)
