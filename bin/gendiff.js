#!/usr/bin/env node
import { Command } from 'commander'
import path from 'path'
import { readFiles } from '../src/parseFile.js'
import genDiff from '../src/index.js'

const program = new Command()

program
  .name('gendiff')
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const path1 = (path.resolve(process.cwd(), filepath1))
    const path2 = (path.resolve(process.cwd(), filepath2))

    const content1 = readFiles(path1)
    const content2 = readFiles(path2)
    console.log(genDiff(content1, content2))
  })
program.parse()
