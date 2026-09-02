export function diffStyle(tree, depth = 0) {
  const padding = '    '.repeat(depth)
  const signPadding = '   '.repeat(depth)

  return tree.flatMap((node) => {
    const type = node.type
    switch (type) {
      case 'added':
        return `${signPadding}+ ${node.key}: ${node.value}`
      case 'removed':
        return `${signPadding}- ${node.key}: ${node.value}`
      case 'unchanged':
        return `${padding} ${node.key}: ${node.value}`
      case 'changed':
        return [
          `${signPadding}- ${node.key}: ${node.oldValue}`,
          `${signPadding}+ ${node.key}: ${node.newValue}`,
        ]
      case 'nested':
        return diffStyle(node.children, depth + 1).split('\n')
      default:
        return []
    }
  }).join('\n')
}
