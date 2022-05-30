# Generate a JavaScript file with map data loaded into variables.
# This file can then be imported by the game.

import json
import math
import os
import sys

import imageToDict

DEFAULT_OUTPUT_FILEPATH = os.path.join('..', 'game', 'mapData.js')
DEFAULT_COLOR_SYMBOL_FILEPATH = 'colorSymbolMap.json'

VAR_NAME_COLOR_SYMBOL_MAP = 'gColorSymbolMap'
VAR_NAME_DATA_MAP = 'gMapData'
VAR_NAME_BLOCK_MAP = 'gBlockMap'

H_STEP_SIZE = 20
V_STEP_SIZE = 20

def jsonDictToIntKeyStrValJsStr(d):
    keysAndValues = ','.join(f'{int(k)}:\'{v}\'' for k, v in d.items())
    return '{' + keysAndValues + '}'

def generateColorSymbolMapStr(colorSymbolFilePath):
    jsContent = ''
    with open(colorSymbolFilePath, 'r') as cs:
        dColorSymbol = json.load(cs)
        s = f'var {VAR_NAME_COLOR_SYMBOL_MAP} = {jsonDictToIntKeyStrValJsStr(dColorSymbol)};'
    return s

def generateActiveBlockMapStr(dImage):
    # Map of current coordinate to the nearby blocks that should be drawn.
    # Quantize coordinates to half block size.
    w, h = dImage['size']
    wBlocks = math.ceil(w / H_STEP_SIZE)
    hBlocks = math.ceil(h / V_STEP_SIZE)
    print(f'{wBlocks}, {hBlocks}')

    idx = 0
    blockStrs = []
    for yBlock in range(hBlocks):
        for xBlock in range(wBlocks):
            self = idx
            left = (idx - 1) if (xBlock > 0) else -1
            right = (idx + 1) if (xBlock < wBlocks - 1) else -1
            up = (idx - hBlocks) if (yBlock > 0) else -1
            down = (idx + hBlocks) if (yBlock < hBlocks - 1) else -1
            upLeft = -1
            upRight = -1
            downLeft = -1
            downRight = -1

            idx += 1

            blockList = [self, up, down, left, right, upLeft, upRight, downLeft, downRight]
            innerArrayStr = ','.join(str(x) for x in blockList)
            blockStrs.append(f"'{xBlock},{yBlock}':[{innerArrayStr}]")

    dStr = '{' + ','.join(x for x in blockStrs) + '}'
    return f'var {VAR_NAME_BLOCK_MAP} = {dStr};'

def generateMapStr(dImage):
    w, h = dImage['size']

    # Generate one block at a time.
    blockStartX = 0
    blockStartY = 0
    blockX = 0
    blockY = 0
    blockIdx = 0
    blockEntries = []

    while (blockStartY < h):
        blockStartX = 0
        blockX = 0
        while (blockStartX < w):
            blockData = []
            for yy in range(V_STEP_SIZE):
                row = []
                for xx in range(H_STEP_SIZE):
                    if yy >= h or xx >= w:
                        row.append(-1) # Invalid data
                    else:
                        row.append(dImage['data'][yy][xx])
                blockData.append(row)

            blockEntries.append(f'{blockIdx}: {blockData}')

            print(f'block {blockX},{blockY} -> idx {blockIdx}')
            blockX += 1
            blockIdx += 1
    
            blockStartX += H_STEP_SIZE

        blockY += 1
        blockStartY += V_STEP_SIZE

    dStr = '{' + ','.join(x for x in blockEntries) + '}'
    return f'var {VAR_NAME_DATA_MAP} = {dStr};'

def generateMapsFile(imagePath, outputFilePath=None, colorSymbolFilePath=None):
    _baseDir, fileName = os.path.split(imagePath)
    name, _ext = os.path.splitext(fileName)

    dImage = imageToDict.imageToDict(imagePath)

    jsContent = ''

    colorSymbolFilePath = colorSymbolFilePath or DEFAULT_COLOR_SYMBOL_FILEPATH
    jsContent = generateColorSymbolMapStr(colorSymbolFilePath)

    blockMapStr = generateActiveBlockMapStr(dImage)
    jsContent += f'\n\n{blockMapStr}'

    mapStr = generateMapStr(dImage)
    jsContent += f'\n\n{mapStr}'

    outputFilePath = outputFilePath or DEFAULT_OUTPUT_FILEPATH

    with open(outputFilePath, 'w') as f:
        print(f'Writing map data to {outputFilePath}')
        f.write(jsContent)

if __name__ == "__main__":
    imagePath = sys.argv[1]
    generateMapsFile(imagePath)
