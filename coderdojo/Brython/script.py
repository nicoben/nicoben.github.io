from browser import document
from browser.html import P, CANVAS
from debug import dump
from drawing import *

def display_offsets(e):
    document['z1'].text = f'(abs_left, abs_top) = ({canvas.abs_left}, {canvas.abs_top})'
    document['z2'].text = f'(scrolled_left, scrolled_top) = ({canvas.scrolled_left}, {canvas.scrolled_top})'

# for i in range(1, 6):
#     document <= P('Hello! #' + str(i), id='zone-' + str(i))

document <= CANVAS(width=600, height=400, id='drawing')

canvas = document['drawing']
ctx = canvas.getContext('2d')
ctx.strokeRect(100, 50, 200, 20)

ctx.save()
ctx.rotate(3.1415 / 32)
ctx.fillStyle = '#9955ff'
ctx.fillRect(50, 100, 20, 200)
ctx.strokeRect(50, 100, 20, 200)
ctx.restore()

ctx.fillStyle = '#9955ff'
ctx.fillRect(150, 100, 20, 200)
ctx.strokeRect(150, 100, 20, 200)

draw_arrow(ctx, 0, 10, canvas.width, 10)
draw_arrow(ctx, 10, 0, 10, canvas.height - 50)

document <= P('...', id='z1')
document <= P('...', id='z2')

# dump(ctx)

document.bind('scroll', display_offsets)
