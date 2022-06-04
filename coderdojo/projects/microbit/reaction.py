def on_pin_pressed_p0():
    global is_running
    if is_running:
        is_running = False
        basic.show_leds("""
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
        """)
        basic.pause(5000)
        go()
input.on_pin_pressed(TouchPin.P0, on_pin_pressed_p0)

def on_pin_pressed_p1():
    go()
input.on_pin_pressed(TouchPin.P1, on_pin_pressed_p1)

def on_pin_pressed_p2():
    global is_running
    if is_running:
        is_running = False
        basic.show_leds("""
            . . # . .
            . . # # .
            # # # # #
            . . # # .
            . . # . .
        """)
        basic.pause(5000)
        go()
input.on_pin_pressed(TouchPin.P2, on_pin_pressed_p2)

def go():
    global is_running
    basic.show_number(3)
    basic.pause(500)
    basic.show_number(2)
    basic.pause(500)
    basic.show_number(1)
    basic.pause(500)
    basic.pause(100)
    basic.clear_screen()
    for index in range(randint(5, 15)):
        led.toggle(2, 2)
        basic.pause(300)
    is_running = True
    basic.show_icon(IconNames.HEART)

is_running = False
basic.show_string("REACTION GAME")
go()