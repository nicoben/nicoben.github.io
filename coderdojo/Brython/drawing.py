from browser import document
from browser.html import P

def draw_arrow(ctx, x1, y1, x2, y2):
    size = 10
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x2 - size, y2 - size)
    ctx.moveTo(x2, y2)
    ctx.lineTo(x2 - size, y2 + size)
    ctx.closePath()
    ctx.stroke()
