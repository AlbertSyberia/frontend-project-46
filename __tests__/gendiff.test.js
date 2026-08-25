import { describe, test, expect } from 'vitest'
import genDiff from '../src/index.js'
import { readFile } from '../src/parsers.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('parsing test', () => {
  test('read JSON file', () => {
    const filePath1 = getFixturePath('file1.json')
    const filePath2 = getFixturePath('file2.json')
    const data1 = fs.readFileSync(filePath1, 'utf-8')
    const data2 = fs.readFileSync(filePath2, 'utf-8')
    const received1 = readFile(filePath1)
    const received2 = readFile(filePath2)

    expect(JSON.parse(data1)).toEqual(received1)
    expect(JSON.parse(data2)).toEqual(received2)
  })
})

describe('test JSON', () => {
  test('comparisons of flat JSON files', () => {
    const filePath1 = getFixturePath('file1.json')
    const filePath2 = getFixturePath('file2.json')
    const diff = genDiff(filePath1, filePath2)
    const data = fs.readFileSync(getFixturePath('expected.txt'), 'utf-8').trim().replace(/\r\n/g, '\n')

    expect(data).toEqual(diff)
  })
})
