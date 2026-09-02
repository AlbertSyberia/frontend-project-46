function formatValue(value) {
  if (value === null) return 'null'
  if (typeof value !== 'object') return String(value)
  return formatObjectLines(value, 0).join('\n')
}

function formatObjectLines(obj, depth) {
  const indent = '    '.repeat(depth)
  const keys = Object.keys(obj).sort()

  if (keys.length === 0) return ['{}']

  const innerIndent = indent + '    '
  const lines = keys.flatMap((key) => {
    const val = obj[key]
    if (typeof val === 'object' && val !== null) {
      const nested = formatObjectLines(val, depth + 1)
      return [`${innerIndent}${key}: ${nested[0]}`, ...nested.slice(1)]
    }
    return [`${innerIndent}${key}: ${formatValue(val)}`]
  })

  return ['{', ...lines, `${indent}}`]
}

function makeLine(sign, key, value, depth) {
  const prefix = sign === ' '
    ? '    '.repeat(depth + 1)
    : '  ' + '    '.repeat(depth) + sign + ' '

  if (typeof value === 'object' && value !== null) {
    const objLines = formatObjectLines(value, depth + 1)
    return [`${prefix}${key}: ${objLines[0]}`, ...objLines.slice(1)]
  }

  return [`${prefix}${key}: ${formatValue(value)}`]
}

function iter(tree, depth = 0) {
  const indent = '    '.repeat(depth)

  return tree.flatMap((node) => {
    switch (node.type) {
      case 'added':
        return makeLine('+', node.key, node.value, depth)
      case 'removed':
        return makeLine('-', node.key, node.value, depth)
      case 'unchanged':
        return makeLine(' ', node.key, node.value, depth)
      case 'changed':
        return [
          ...makeLine('-', node.key, node.oldValue, depth),
          ...makeLine('+', node.key, node.newValue, depth),
        ]
      case 'nested':
        return [
          `${indent}    ${node.key}: {`,
          ...iter(node.children, depth + 1),
          `${indent}    }`,
        ]
      default:
        return []
    }
  })
}

export function diffStyle(tree) {
  return `{\n${iter(tree, 0).join('\n')}\n}`
}
