import { testTree } from '@lezer/generator/test'
import { HomescriptLanguage } from './dist/index.js'

let ast = HomescriptLanguage.parser.parse(`
#[trigger on message(['foo/bar'])]
event fn foo(topic: str, payload: str) {
    
}
`)

// $Driver = {
//     @setting bool_setting: bool,
// };

let spec = ``

// testTree(ast, spec);

console.log(`${ast}`)
