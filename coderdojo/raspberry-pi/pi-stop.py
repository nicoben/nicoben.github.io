from gpiozero import LED
from time import sleep

led_r1 = LED(2)
led_a1 = LED(3)
led_g1 = LED(4)

led_r2 = LED(13)
led_a2 = LED(19)
led_g2 = LED(26)

count = 0

while True:
    led_r1.value = count & 1
    led_a1.value = count & 2
    led_g1.value = count & 4
    led_r2.value = not led_r1.value
    led_a2.value = not led_a1.value
    led_g2.value = not led_g1.value
    sleep(0.5)
    count += 1
