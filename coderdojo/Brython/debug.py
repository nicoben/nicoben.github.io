from browser import document
from browser.html import P, TABLE, TR, TD

def dump(obj):
    document <= P()

    table = TABLE()
    document <= table

    for x in sorted(dir(obj)):
        tr = TR()
        table <= tr
        tr <= TD(x)
        tr <= TD('???')
