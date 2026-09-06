import { describe, test, expect } from 'vitest'
import genDiff from '../src/index.js'
import { readFile } from '../src/data/parsers.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { load } from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

describe('parsing test', () => {
  test('read JSON file', () => {
    const filePath = getFixturePath('JSON/jsonFlat1.json')
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const received = readFile(filePath)

    expect(received).toEqual(data)
  })

  test('read YAML file', () => {
    const filePath = getFixturePath('YAML/yamlFlat1.yaml')
    const data = fs.readFileSync(filePath, 'utf-8')
    const expected = load(data)
    const received = readFile(filePath)

    expect(received).toEqual(expected)
  })

  test('unknown file format', () => {
    const filePath = getFixturePath('flat.txt')
    expect(() => readFile(filePath)).toThrow('Unknown format: .txt')
  })
})

describe('test JSON', () => {
  test('comparisons of flat JSON files', () => {
    const filePath1 = getFixturePath('JSON/jsonFlat1.json')
    const filePath2 = getFixturePath('JSON/jsonFlat2.json')
    const diff = genDiff(filePath1, filePath2)
    const data = fs.readFileSync(getFixturePath('flat.txt'), 'utf-8').trim().replace(/\r\n/g, '\n')

    expect(diff).toEqual(data)
  })
  test ('nested structure JSON files', () => {
    const filePath1 = getFixturePath('JSON/jsonNesting1.json')
    const filePath2 = getFixturePath('JSON/jsonNesting2.json')
    const diff = genDiff(filePath1, filePath2)
    const data = fs.readFileSync(getFixturePath('nesting.txt'), 'utf-8').trim().replace(/\r\n/g, '\n')

    expect(diff).toEqual(data)
  })
})

describe('test YAML', () => {
  test('comparisons of flat YAML files', () => {
    const path1 = getFixturePath('YAML/yamlFlat1.yaml')
    const path2 = getFixturePath('YAML/yamlFlat2.yaml')
    const diff = genDiff(path1, path2)
    const data = fs.readFileSync(getFixturePath('flat.txt'), 'utf-8').trim().replace(/\r\n/g, '\n')

    expect(diff).toEqual(data)
  })
  test ('nested structure YAML files', () => {
    const filePath1 = getFixturePath('YAML/yamlNesting1.yaml')
    const filePath2 = getFixturePath('YAML/yamlNesting2.yaml')
    const diff = genDiff(filePath1, filePath2)
    const data = fs.readFileSync(getFixturePath('nesting.txt'), 'utf-8').trim().replace(/\r\n/g, '\n')

    expect(diff).toEqual(data)
  })
})
