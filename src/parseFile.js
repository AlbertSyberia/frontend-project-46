import fs from 'fs'

export function readFiles(file1) {
  return fs.readFileSync(file1, 'utf8')
}
