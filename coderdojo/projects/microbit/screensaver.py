def demo1():
    for index in range(4):
        led.toggle(index, 0)
        led.toggle(4, index)
        led.toggle(4 - index, 4)
        led.toggle(0, 4 - index)
        basic.pause(200)

def demo2():
    pairs = [(0, -1), (+1, -1), (+1, 0), (+1, +1), (0, +1), (-1, +1), (-1, 0), (-1, -1)]
    for dx_dy in pairs:
        dx, dy = dx_dy
        basic.clear_screen()
        led.plot(2 + 2 * dx, 2 + 2 * dy)
        led.plot(2 + 1 * dx, 2 + 1 * dy)
        led.plot(2, 2)
        # led.plot(2 - 1 * dx, 2 - 1 * dy)
        # led.plot(2 - 2 * dx, 2 - 2 * dy)
        basic.pause(100)

def on_forever():
    basic.clear_screen()
    for i in range(8):
        demo1()

    basic.clear_screen()
    for i in range(4):
        demo2()

basic.forever(on_forever)
