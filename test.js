import {HomescriptLanguage} from './dist/index.js'
import {testTree} from "@lezer/generator/test"

let ast = HomescriptLanguage.parser.parse("fn main() { lol(); }")
let spec = `
Program(
    Item(
        FunctionDefinition(
            fn, Ident, Parameters("(",")"), Block(
                "{",
                    Statement(
                        ExpressionStatement(
                            ExpressionWithoutBlock(
                                CallExpression(
                                    Expression(
                                        ExpressionWithoutBlock(VariableName(Ident))
                                    ), "(",")
                                ")
                            ),";"
                        )
                    ),
                "}"
            )
        )
    )
)
`

testTree(ast, spec)
