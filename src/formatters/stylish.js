export function diffStyle(tree, depth = 0) {
  const padding = '    '.repeat(depth)
  const signPadding = '   '.repeat(depth)

  return tree.flatMap((node) => {
    const type = node.type
    switch (type) {
      case 'added':
        return `${signPadding}+ ${node.key}: ${formatValue(node.value)}`
      case 'removed':
        return `${signPadding}- ${node.key}: ${formatValue(node.value)}`
      case 'unchanged':
        return `${padding} ${node.key}: ${formatValue(node.value)}`
      case 'changed':
        return [
          `${signPadding}- ${node.key}: ${formatValue(node.oldValue)}`,
          `${signPadding}+ ${node.key}: ${formatValue(node.newValue)}`,
        ]
      case 'nested':
        return diffStyle(node.children, depth + 1)
      default:
        return []
    }
  }).join('\n')
}

function formatValue(value) {
  if (value === null) return 'null'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}
