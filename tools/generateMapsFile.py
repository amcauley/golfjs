# Generate a JavaScript file with map data loaded into variables.
# This file can then be imported by the game.

import json
import os
import sys

import imageToDict

DEFAULT_OUTPUT_FILEPATH = os.path.join('..', 'game', 'mapData.js')
DEFAULT_COLOR_SYMBOL_FILEPATH = 'colorSymbolMap.json'

VAR_NAME_COLOR_SYMBOL_MAP = 'gColorSymbolMap'
VAR_NAME_DATA_MAP = 'gMapData'

def jsonDictToIntKeyStrValJsStr(d):
    keysAndValues = ','.join(f'{int(k)}:\'{v}\'' for k, v in d.items())
    return '{' + keysAndValues + '}'

def generateMapsFile(imagePaths, outputFilePath=None, colorSymbolFilePath=None):
    dMaps = {}

    jsContent = ''

    colorSymbolFilePath = colorSymbolFilePath or DEFAULT_COLOR_SYMBOL_FILEPATH
    with open(colorSymbolFilePath, 'r') as cs:
        dColorSymbol = json.load(cs)
        jsContent = f'var {VAR_NAME_COLOR_SYMBOL_MAP} = {jsonDictToIntKeyStrValJsStr(dColorSymbol)};'

    for imagePath in imagePaths:
        _baseDir, fileName = os.path.split(imagePath)
        name, _ext = os.path.splitext(fileName)

        dMaps[name] = imageToDict.imageToDict(imagePath)

    s = json.dumps(dMaps)
    jsContent += f'\n\nvar {VAR_NAME_DATA_MAP} = {s};'

    outputFilePath = outputFilePath or DEFAULT_OUTPUT_FILEPATH

    with open(outputFilePath, 'w') as f:
        print(f'Writing map data to {outputFilePath}')
        f.write(jsContent)

if __name__ == "__main__":
    imagePaths = sys.argv[1:]
    generateMapsFile(imagePaths)
