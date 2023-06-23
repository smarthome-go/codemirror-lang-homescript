import { testTree } from '@lezer/generator/test'
import { HomescriptLanguage } from './dist/index.js'

let ast = HomescriptLanguage.parser.parse(`
let a  = -1 - test + last;
`)

let spec = ``

// testTree(ast, spec);

console.log(`${ast}`)
