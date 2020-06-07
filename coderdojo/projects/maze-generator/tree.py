"""
  *
 ***
*****
  | w=5, 3
    
    *
   ***
  *****
   ***
  *****
 *******
*********
   ||| w=9, 3+4

      *
     ***
    *****
     ***
    *****
   *******
  *********
    *****
   *******
  *********
 ***********
*************
     ||| w=13, 3+4+5

        *
       ***
      *****
       ***
      *****
     *******
    *********
      *****
     *******
    *********
   ***********
  *************
     *******
    *********
   ***********
  *************
 ***************
*****************
      ||||| w=17, 3+4+5+6

"""


def tree(n):
    """
    |     w=5,  3
    |||   w=9,  3+4
    |||   w=13, 3+4+5
    ||||| w=17, 3+4+5+6
    ||||| w=21, 3+4+5+6+7
    """

    BLANK = " "

    width = 5 + 4 * (n - 1)
    lines = []

    for i in range(n):
        x = i + 3
        for j in range(x):
            stars = "*" * (2 * j + 1 + 2 * i)
            lines += [stars.center(width, BLANK)]

    trunk = "|" * (n + (1 if n % 2 == 0 else 0))
    lines += [trunk.center(width, BLANK)]

    return lines


def display(lines, width=None):
    for l in lines:
        if width is None:
            print(l)
        else:
            print(l.center(width))


trees = [tree(_) for _ in range(1, 7)]
width = len(trees[-1][-1])

for t in trees:
    display(t, width)
    print()
