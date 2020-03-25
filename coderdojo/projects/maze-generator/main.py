from random import shuffle, randrange


# def make_maze(w=15, h=15):
#     vis = [[0] * w + [1] for _ in range(h)] + [[1] * (w + 1)]
#     ver = [["|  "] * w + ["|"] for _ in range(h)] + [[]]
#     hor = [["+--"] * w + ["+"] for _ in range(h + 1)]
# 
#     def walk(x, y):
#         vis[y][x] = 1
# 
#         d = [(x - 1, y), (x, y + 1), (x + 1, y), (x, y - 1)]
#         shuffle(d)
#         for (xx, yy) in d:
#             if vis[yy][xx]:
#                 continue
#             if xx == x:
#                 hor[max(y, yy)][x] = "+  "
#             if yy == y:
#                 ver[y][max(x, xx)] = "   "
#             walk(xx, yy)
# 
#     walk(randrange(w), randrange(h))
# 
#     s = ""
#     for (a, b) in zip(hor, ver):
#         s += "".join(a + ["\n"] + b + ["\n"])
#     return s


def make_maze(w=15, h=15):
    vis = [[0] * w + [1] for _ in range(h)] + [[1] * (w + 1)]
    ver = [["| "] * w + ["|"] for _ in range(h)] + [[]]
    hor = [["+-"] * w + ["+"] for _ in range(h + 1)]

    def walk(x, y):
        vis[y][x] = 1

        d = [(x - 1, y), (x, y + 1), (x + 1, y), (x, y - 1)]
        shuffle(d)
        for (xx, yy) in d:
            if vis[yy][xx]:
                continue
            if xx == x:
                hor[max(y, yy)][x] = "+ "
            if yy == y:
                ver[y][max(x, xx)] = "  "
            walk(xx, yy)

    walk(randrange(w), randrange(h))

    s = ""
    for (a, b) in zip(hor, ver):
        s += "".join(a + ["\n"] + b + ["\n"])
    return s


def make_tilemap(maze):
    def safe_get(x, y):
        if x < 0 or x >= w or y < 0 or y >= h:
            return "."
        else:
            return "X" if data[y][x] != " " else "."

    def check_neighbours(x, y):
        res = ""
        for dy in (-1, 0, 1):
            for dx in (-1, 0, 1):
                res += safe_get(x + dx, y + dy)
        return res

    lookup = {
        "....XX.X.": "A",  # 6
        "...XX..X.": "B",  # 7
        ".X.XX....": "C",  # 19
        ".X..XX...": "D",  # 18
        "...XXX...": "E",  # 13
        "..XXXX...": "E",
        "...XXXX..": "E",
        "...XXX..X": "E",
        "..XXXX..X": "E",
        "...XXX...": "E",
        "X..XXXX..": "E",
        "X..XXXX..": "E",
        "X..XXX...": "E",
        "X..XXXX.X": "E",
        "X..XXX..X": "E",
        "..XXXXX..": "E",
        "...XXXX.X": "E",
        "X.XXXXX..": "E",
        "..XXXXX.X": "E",
        "X.XXXX...": "E",
        "...XXX.X.": "F",  # 42
        ".XX.X..X.": "G",  # 1
        ".X..X..X.": "G",
        "XXX.X..X.": "G",
        ".X..X.XXX": "G",
        "XX..X..X.": "G",
        ".X..X.XX.": "G",
        "XXX.X.XXX": "G",
        ".X..X..XX": "G",
        ".XX.X..XX": "G",
        "XXX.X.XX.": "G",
        ".XX.X.XX.": "G",
        ".XX.X.XXX": "G",
        "XXX.X..XX": "G",
        "XX..X.XX.": "G",
        "XX..X..XX": "G",
        "XX..X.XXX": "G",
        "X.XXXX..X": "G",
        ".X..XX.X.": "H",  # 29
        ".X.XX..X.": "I",  # 30
        ".X.XXX...": "J",  # 41
        "...XX....": "K",  # 46
        "....XX...": "L",  # 45
        "....X..X.": "M",  # 33
        ".X.XXX.X.": "N",  # 34
        ".X..X....": "O",  # 10
    }

    def calculate(x, y):
        if data[y][x] == " ":
            return "."
        else:
            neighbours = check_neighbours(x, y)
            ch = lookup.get(neighbours, "#")
            # print(x, y, neighbours, ch)
            return ch

    data = [_ for _ in maze.split("\n") if _ != ""]
    w = len(data[0])
    h = len(data)
    tilemap = []
    for y in range(h):
        line = ""
        for x in range(w):
            line += calculate(x, y)
        tilemap.append(line)
    return "\n".join(tilemap)


if __name__ == "__main__":
    maze = make_maze()
    tilemap = make_tilemap(maze)
    print(tilemap.replace(".", " ").replace("#", "?"))

    tiles_dict = {
        "A": 2,
        "B": 3,
        "C": 15,
        "D": 14,
        "E": 13,
        "F": 42,
        "G": 1,
        "H": 29,
        "I": 30,
        "J": 41,
        "K": 46,
        "L": 45,
        "M": 33,
        "N": 10,
        "O": 34,
    }

    lines = tilemap.split("\n")
    lines.insert(0, "." * len(lines[0]))
    lines.append("." * len(lines[0]))
    lines = [f".{_}." for _ in lines]
    
    print("width:", len(lines[0]))
    print("height:", len(lines))
    tiles = []
    for line in lines:
        for ch in line:
            tiles.append(tiles_dict.get(ch, "25"))

    print(",".join([str(_) for _ in tiles]))
