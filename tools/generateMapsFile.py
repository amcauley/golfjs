# Generate a JavaScript file with map data loaded into variables.
# This file can then be imported by the game.

import json
import os
import sys

import imageToDict

DEFAULT_OUTPUT_FILEPATH = os.path.join('..', 'game', 'mapData.js')
MAP_VARIABLE_NAME = 'gMapData'

def generateMapsFile(imagePaths, outputFilePath=None):
    dMaps = {}

    for imagePath in imagePaths:
        _baseDir, fileName = os.path.split(imagePath)
        name, _ext = os.path.splitext(fileName)

        dMaps[name] = imageToDict.imageToDict(imagePath)

    s = json.dumps(dMaps)
    jsContent = f'var {MAP_VARIABLE_NAME} = {s};'

    outputFilePath = outputFilePath or DEFAULT_OUTPUT_FILEPATH

    with open(outputFilePath, 'w') as f:
        print(f'Writing map data to {outputFilePath}')
        f.write(jsContent)

if __name__ == "__main__":
    imagePaths = sys.argv[1:]
    generateMapsFile(imagePaths)
