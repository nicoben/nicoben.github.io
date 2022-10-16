from bluedot import BlueDot
from signal import pause

COLOR_RELEASED = '#707070'
COLOR_PRESSED = 'red'
COLOR_MOVING = 'green'
COLOR_SWIPE = 'yellow'
COLOR_ROTATE = 'blue'

def format_pos(pos):
    loc = None
    attrs = ['middle', 'top', 'bottom', 'left', 'right']
    for attr in attrs:
        if getattr(pos, attr):
            loc = attr
            break
    return f'{loc}, col={pos.col}, row={pos.row}, x={pos.x:.02f}, y={pos.y:.02f}, angle={pos.angle:.02f}, distance={pos.distance:.02f}, time={pos.time:.02f}'

def format_swipe(swipe):
    dir_ = None
    attrs = ['up', 'down', 'left', 'right']
    for attr in attrs:
        if getattr(swipe, attr):
            dir_ = attr
            break
    return f'{dir_}, speed={swipe.speed:.02f}, angle={swipe.angle:.02f}, distance={swipe.distance:.02f}'

def format_rotation(rotation):
    dir_ = 'clockwise' if rotation.clockwise else 'anti_clockwise'
    return f'{dir_}, value={rotation.value:.02f}'

def on_press(pos):
    global bd
    button = bd[pos.col, pos.row]
    if not button.visible: return
    print(f'press - {format_pos(pos)}')
    button.color = COLOR_PRESSED

def on_release(pos):
    global bd
    button = bd[pos.col, pos.row]
    if not button.visible: return
    print(f'release - {format_pos(pos)}')
    button.color = COLOR_RELEASED

def on_double_press(pos):
    global bd
    button = bd[pos.col, pos.row]
    if not button.visible: return
    print(f'double-press - {format_pos(pos)}')

def on_move(pos):
    global bd
    button = bd[pos.col, pos.row]
    if not button.visible: return
    print(f'move - {format_pos(pos)}')
    button.color = COLOR_MOVING

def on_swipe(swipe):
    global bd
    button = bd[swipe.col, swipe.row]
    if not button.visible: return
    print(f'swipe - {format_swipe(swipe)}')
    button.color = COLOR_SWIPE

def on_rotate(rotation):
    global bd
    button = bd[rotation.col, rotation.row]
    if not button.visible: return
    print(f'rotate - {format_rotation(rotation)}')
    button.color = COLOR_ROTATE

def demo_dpad():
    global bd

    bd = BlueDot(rows=3, cols=3)

    bd.color = COLOR_RELEASED
    bd.border = False
    bd.square = True

    bd[0, 0].visible = False
    bd[2, 0].visible = False
    bd[0, 2].visible = False
    bd[2, 2].visible = False

    bd.when_pressed = on_press
    bd.when_released = on_release
    bd.when_double_pressed = on_double_press

def demo_move():
    global bd

    bd = BlueDot()

    bd.color = COLOR_RELEASED
    bd.border = False
    bd.square = True

    bd.when_pressed = on_press
    bd.when_released = on_release
    bd.when_double_pressed = on_double_press
    bd.when_swiped = on_swipe
    bd.when_moved = on_move

def demo_rotate():
    global bd

    bd = BlueDot()

    bd.color = COLOR_RELEASED
    bd.border = False
    bd.rotation_segments = 12

    bd.when_pressed = on_press
    bd.when_released = on_release
    bd.when_double_pressed = on_double_press
    bd.when_swiped = on_swipe
    bd.when_rotated = on_rotate

if __name__ == '__main__':
#     demo_dpad()
#     demo_move()
    demo_rotate()
    pause()