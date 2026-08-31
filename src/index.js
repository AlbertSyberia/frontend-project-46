import { diffStyle } from './formatters/stylish.js'
import { readFile } from './data/parsers.js'
import { builder } from './data/buildTree.js'

export default function (file1, file2) {
  const content1 = readFile(file1)
  const content2 = readFile(file2)

  const tree = builder(content1, content2)

  return diffStyle(tree)
}
