basic.show_string("TESTER")

def on_forever():
    if input.button_is_pressed(Button.AB):
        basic.show_leds("""
            . . # . .
            . . # . .
            # # # # #
            . . # . .
            . . # . .
        """)
    elif input.button_is_pressed(Button.A):
        basic.show_leds("""
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
        """)
    elif input.button_is_pressed(Button.B):
        basic.show_leds("""
            . . # . .
            . . # # .
            # # # # #
            . . # # .
            . . # . .
        """)
    elif input.logo_is_pressed():
        basic.show_leds("""
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
        """)
    elif input.pin_is_pressed(TouchPin.P0):
        basic.show_number(0)
    elif input.pin_is_pressed(TouchPin.P1):
        basic.show_number(1)
    elif input.pin_is_pressed(TouchPin.P2):
        basic.show_number(2)
    else:
        basic.clear_screen()
basic.forever(on_forever)
