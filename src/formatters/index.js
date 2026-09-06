import { diffStyle } from './stylish.js'
import { diffPlain } from './plain.js'
import { diffJson } from './json.js'

export function choiceFormat(tree, format = 'stylish') {
  switch (format) {
    case 'stylish':
      return diffStyle(tree)
    case 'plain':
      return diffPlain(tree)
    case 'json':
      return diffJson(tree)
    default:
      throw new Error(`Unknown formatter: ${format}`)
  }
}
