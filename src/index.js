import _ from 'lodash'

export default function (file1, file2) {
  const fileKeys1 = Object.keys(file1)
  const fileKeys2 = Object.keys(file2)
  const allKeys = Array.from(new Set([...fileKeys1, ...fileKeys2])).sort()

  const diffLines = allKeys.flatMap((key) => {
    const keyIn1 = key in file1
    const keyIn2 = key in file2
    const value1 = file1[key]
    const value2 = file2[key]

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
