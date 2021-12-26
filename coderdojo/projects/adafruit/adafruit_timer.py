import time
from rainbowio import colorwheel
from adafruit_circuitplayground import cp
from collections import namedtuple


def beep():
    cp.red_led = True
    cp.play_tone(262, 0.05)
    cp.red_led = False


def rainbow_cycle(wait):
    for j in range(255):
        for i in range(cp.pixels.n):
            idx = int((i * 256 / len(cp.pixels)) + j)
            cp.pixels[i] = colorwheel(idx & 255)
        cp.pixels.show()
        time.sleep(wait)


Event = namedtuple("Event", ["target", "action", "state"])


class Button:
    A = "a"
    B = "b"
    SWITCH = "switch"

    def __init__(
        self, letter, changed_cb=None, pressed_cb=None, clicked_cb=None, debug=False
    ):
        self.letter = letter
        self.last_state = self.read_state()
        self.changed_cb = changed_cb
        self.pressed_cb = pressed_cb
        self.clicked_cb = clicked_cb
        self.debug = debug

    def read_state(self):
        if self.letter == Button.A:
            return cp.button_a
        elif self.letter == Button.B:
            return cp.button_b
        elif self.letter == Button.SWITCH:
            return cp.switch
        else:
            raise Exception(f"Invalid button: {self.letter}")

    def poll(self):
        new_state = self.read_state()
        if new_state != self.last_state:
            self.last_state = new_state
            self.on_changed(Event(self.letter, "changed", new_state))
            if new_state:
                self.on_pressed(Event(self.letter, "pressed", new_state))
            else:
                self.on_clicked(Event(self.letter, "clicked", new_state))

    def on_changed(self, evt):
        if self.debug:
            print(evt)
        if self.changed_cb:
            self.changed_cb(evt)

    def on_pressed(self, evt):
        if self.debug:
            print(evt)
        if self.pressed_cb:
            self.pressed_cb(evt)

    def on_clicked(self, evt):
        if self.debug:
            print(evt)
        if self.clicked_cb:
            self.clicked_cb(evt)


class Timer:
    def __init__(self, active, resolution, count=1):
        self.resolution = resolution
        self.count = count
        self.duration = self.resolution * self.count
        self.set_active(active)

    def set_active(self, value):
        self.active = value
        if self.active:
            print("Stop timer")
        else:
            print("Start timer")
            self.start_time = time.monotonic()
            self.tick()
        self.show()

    def increase(self):
        if self.count < cp.pixels.n:
            self.count += 1
            self.duration = self.resolution * self.count
            self.show()
        else:
            beep()

    def decrease(self):
        if self.count > 1:
            self.count -= 1
            self.duration = self.resolution * self.count
            self.show()
        else:
            beep()

    def show(self):
        if self.active:
            num_on = self.count
            col_on = (0, 0, 25)
        else:
            num_on = self.remaining_count
            if num_on == 1:
                col_on = (25, 0, 0)
            elif num_on <= 3:
                col_on = (25, 25, 0)
            else:
                col_on = (0, 25, 0)
        num_off = cp.pixels.n - num_on
        col_off = (0, 0, 0)
        cp.pixels[0:10] = [col_off] * num_off + [col_on] * num_on
        cp.pixels.show()

    def tick(self):
        if not self.active:
            self.elapsed_time = time.monotonic() - self.start_time
            self.remaining_time = max(self.duration - self.elapsed_time, 0)
            self.remaining_count = round(cp.pixels.n * self.remaining_time / self.duration)
            self.show()


def button_a_clicked(evt):
    if timer.active:
        timer.decrease()
    else:
        beep()


def button_b_clicked(evt):
    if timer.active:
        timer.increase()
    else:
        beep()


def switch_changed(evt):
    timer.set_active(evt.state)


if __name__ == "__main__":
    cp.pixels.auto_write = False
    cp.pixels.brightness = 0.05
    cp.pixels.fill((0, 0, 0))

    button_a = Button(Button.A, clicked_cb=button_a_clicked)
    button_b = Button(Button.B, clicked_cb=button_b_clicked)
    switch = Button(Button.SWITCH, changed_cb=switch_changed)
    timer = Timer(resolution=60, count=6, active=switch.read_state())

    while True:
        button_a.poll()
        button_b.poll()
        switch.poll()
        timer.tick()
        time.sleep(0.001)
