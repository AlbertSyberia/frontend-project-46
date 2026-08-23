import fs from 'fs'
import path from 'path'

export function readFiles(file) {
  const filePath = (path.resolve(process.cwd(), file))
  const dataFile = fs.readFileSync(filePath, 'utf8')
  const formatFile = path.extname(filePath).toLowerCase()
  switch (formatFile) {
    case '.json':
      return JSON.parse(dataFile)
    case '.yaml':
    default:
      throw new Error(`Unknown format: ${formatFile}`)
  }
}
