import json
import sys

from PIL import Image

def imageToDict(imagePath):

    with Image.open(imagePath) as im:
        px = im.load()
        w, h = im.size

        pixArray = []
        for y in range(h):
            row = []
            for x in range(w):
                row.append([*px[x, y]])
            pixArray.append(row)

    dOut = {
        'size': [w, h],
        'data': pixArray,
    }

    return dOut

if __name__ == "__main__":
    imagePath = sys.argv[1]
    dOut = imageToDict(imagePath)
    print(dOut)
