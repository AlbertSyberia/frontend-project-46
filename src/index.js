import { readFile } from './parsers.js'
import { builder } from './buildTree.js'
import { choiceFormat } from './formatters/index.js'

export default function (file1, file2, format) {
  const content1 = readFile(file1)
  const content2 = readFile(file2)

  const tree = builder(content1, content2)

  return choiceFormat(tree, format)
}
