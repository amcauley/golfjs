import json
import os
import sys

from PIL import Image

def imageToJson(imagePath, jsonPath=None):
    baseDir, imageFileName = os.path.split(imagePath)
    imageName, imageExt = os.path.splitext(imageFileName)

    jsonPath = jsonPath or os.path.join(baseDir, f'{imageName}.json')

    with Image.open(imagePath) as im:
        px = im.load()
        w, h = im.size

        pixels = []
        for x in range(w):
            for y in range(h):
                pixels.append([*px[x, y]])

    dOut = {
        'size': [w, h],
        'data': pixels,
    }

    with open(jsonPath, 'w') as f:
        print(f'Writing JSON to {jsonPath}')
        json.dump(dOut, f)

if __name__ == "__main__":
    l = len(sys.argv)

    if l == 2:
        imageToJson(sys.argv[1])
    elif l == 3:
        imageToJson(*sys.argv[1:])
    else:
        print(f'Usage: python {__file__} inputImagePath <outputJsonPath>')
