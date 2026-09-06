function plainStylish(tree, path = []) {
  return tree.flatMap((node) => {
    const type = node.type
    const key = node.key
    const val = node.value
    const currentPath = [...path, key].join('.')
    switch (type) {
      case 'added':
        return `Property '${currentPath}' was added with value: ${formatValue(val)}`

      case 'removed':
        return `Property '${currentPath}' was removed`

      case 'changed':
        return `Property '${currentPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`

      case 'nested':
        return [...plainStylish(node.children, [currentPath])]

      default:
        return []
    }
  })
}

function formatValue(value) {
  if (typeof value === 'object' && value !== null) return `[complex value]`
  if (typeof value === 'string') return `'${value}'`
  return String(value)
}

export const diffPlain = tree => plainStylish(tree).join('\n')
