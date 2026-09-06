function stringifyObject(obj, depth) {
  const indent = '    '.repeat(depth)

  return Object.entries(obj).flatMap(([key, val]) => {
    if (val === null) {
      return `${indent}${key}: null`
    }
    if (typeof val === 'object' && !Array.isArray(val)) {
      return [
        `${indent}${key}: {`,
        ...stringifyObject(val, depth + 1),
        `${indent}}`,
      ]
    }
    return `${indent}${key}: ${val}`
  })
}

function nesting(children, depth = 0) {
  const signIndent = '  ' + '    '.repeat(depth)
  const plainIndent = '    '.repeat(depth + 1)

  return children.flatMap((node) => {
    const { key, type } = node

    switch (type) {
      case 'added': {
        const val = node.value
        if (val === null) return `${signIndent}+ ${key}: null`
        if (typeof val === 'object' && !Array.isArray(val)) {
          return [
            `${signIndent}+ ${key}: {`,
            ...stringifyObject(val, depth + 2),
            `${plainIndent}}`,
          ]
        }
        return `${signIndent}+ ${key}: ${val}`
      }

      case 'removed': {
        const val = node.value
        if (val === null) return `${signIndent}- ${key}: null`
        if (typeof val === 'object' && !Array.isArray(val)) {
          return [
            `${signIndent}- ${key}: {`,
            ...stringifyObject(val, depth + 2),
            `${plainIndent}}`,
          ]
        }
        return `${signIndent}- ${key}: ${val}`
      }

      case 'unchanged': {
        const val = node.value
        if (val === null) return `${plainIndent}${key}: null`
        if (typeof val === 'object' && !Array.isArray(val)) {
          return [
            `${plainIndent}${key}: {`,
            ...stringifyObject(val, depth + 2),
            `${plainIndent}}`,
          ]
        }
        return `${plainIndent}${key}: ${val}`
      }

      case 'changed': {
        const oldVal = node.oldValue
        const newVal = node.newValue
        const lines = []

        if (oldVal === null) {
          lines.push(`${signIndent}- ${key}: null`)
        }
        else if (typeof oldVal === 'object' && !Array.isArray(oldVal)) {
          lines.push(
            `${signIndent}- ${key}: {`,
            ...stringifyObject(oldVal, depth + 2),
            `${plainIndent}}`,
          )
        }
        else {
          lines.push(`${signIndent}- ${key}: ${oldVal}`)
        }

        if (newVal === null) {
          lines.push(`${signIndent}+ ${key}: null`)
        }
        else if (typeof newVal === 'object' && !Array.isArray(newVal)) {
          lines.push(
            `${signIndent}+ ${key}: {`,
            ...stringifyObject(newVal, depth + 2),
            `${plainIndent}}`,
          )
        }
        else {
          lines.push(`${signIndent}+ ${key}: ${newVal}`)
        }

        return lines
      }

      case 'nested': {
        return [
          `${plainIndent}${key}: {`,
          ...nesting(node.children, depth + 1),
          `${plainIndent}}`,
        ]
      }

      default:
        return []
    }
  })
}

export function diffStyle(tree) {
  return ['{', ...nesting(tree, 0), '}'].join('\n')
}
