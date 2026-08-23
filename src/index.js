import _ from 'lodash'
import { readFiles } from '../src/parseFile.js'

export default function (file1, file2) {
  const content1 = readFiles(file1)
  const content2 = readFiles(file2)
  const fileKeys1 = Object.keys(content1)
  const fileKeys2 = Object.keys(content2)
  const allKeys = Array.from(new Set([...fileKeys1, ...fileKeys2])).sort()

  const diffLines = allKeys.flatMap((key) => {
    const keyIn1 = key in content1
    const keyIn2 = key in content2
    const value1 = content1[key]
    const value2 = content2[key]

    if (keyIn1 && keyIn2) {
      if (_.isEqual(value1, value2)) {
        return `    ${key}: ${value1}`
      }
      return [
        `  - ${key}: ${value1}`,
        `  + ${key}: ${value2}`,
      ]
    }
    if (!keyIn1 && keyIn2) {
      return `  + ${key}: ${value2}`
    }
    if (keyIn1 && !keyIn2) {
      return `  - ${key}: ${value1}`
    }
  }).join('\n')

  return `{\n${diffLines}\n}`
}
