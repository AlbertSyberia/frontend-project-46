// import _ from 'lodash'

export default function (file1, file2) {
  const fileKeys1 = Object.keys(file1)
  const fileKeys2 = Object.keys(file2)
  const allKeys = Array.from(new Set([...fileKeys1, ...fileKeys2])).sort()

  return allKeys.flatMap((key) => {
    if (key in file1 && key in file2) {
      if (file1[key] === file2[key]) {
        return { key: key, value: file1[key] }
      }
      else {
        const value1 = { key: key, value: file1[key] }
        const value2 = { key: key, value: file2[key] }
        return { value1, value2 }
      }
    }
  })
}
