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
                pixData = px[x, y]
                # For monochrome BMP, data is a single value
                if isinstance(pixData, int):
                    row.append(pixData)
                else:
                    row.append([*pixData])
            pixArray.append(row)

    dOut = {
        'size': [w, h],
        'data': pixArray,
    }

    return dOut

if __name__ == "__main__":
    imagePath = sys.argv[1]
    dOut = imageToDict(imagePath)

    uniqueVals = set()
    for row in dOut['data']:
        uniqueVals = uniqueVals.union(set(row))

    print(f'Unique values: {sorted(uniqueVals)}')
