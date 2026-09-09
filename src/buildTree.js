import _ from 'lodash'

export function builder(content1, content2) {
  const fileKeys1 = Object.keys(content1)
  const fileKeys2 = Object.keys(content2)
  const allKeys = Array.from(new Set([...fileKeys1, ...fileKeys2])).sort()

  return allKeys.map((key) => {
    const keyIn1 = key in content1
    const keyIn2 = key in content2
    const val1 = content1[key]
    const val2 = content2[key]

    if (!keyIn1 && keyIn2) {
      return { key, type: 'added', value: val2 }
    }

    if (keyIn1 && !keyIn2) {
      return { key, type: 'removed', value: val1 }
    }

    if (keyIn1 && keyIn2) {
      if (_.isEqual(val1, val2)) {
        return { key, type: 'unchanged', value: val1 }
      }

      if (_.isObject(val1) && _.isObject(val2)) {
        return {
          key,
          type: 'nested',
          children: builder(val1, val2),
        }
      }
      return {
        key,
        type: 'changed',
        oldValue: val1,
        newValue: val2,
      }
    }
  })
}
