import fs from 'fs'
import path from 'path'

export function readFiles(file) {
  const formatFile = path.extname(file).toLowerCase()
  switch (formatFile) {
    case '.json':
      return JSON.parse(fs.readFileSync(file, 'utf8'))
    case '.yaml':
    case '.yml':
      return 'yaml'
    default:
      throw new Error(`Unknown format: ${formatFile}`)
  }
}
