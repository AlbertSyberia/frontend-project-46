import fs from 'fs'
import path from 'path'

export function readFiles(file) {
  const dataFile = fs.readFileSync(file, 'utf8')
  const formatFile = path.extname(file).toLowerCase()
  switch (formatFile) {
    case '.json':
      return JSON.parse(dataFile)
    case '.yaml':
    default:
      throw new Error(`Unknown format: ${formatFile}`)
  }
}
