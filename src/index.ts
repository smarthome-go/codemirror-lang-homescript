import {
    delimitedIndent,
    foldInside,
    foldNodeProp,
    indentNodeProp,
    LanguageSupport,
    LRLanguage,
} from '@codemirror/language'
import { styleTags, tags as t } from '@lezer/highlight'
import { parser } from './syntax.grammar'

export const HomescriptLanguage = LRLanguage.define({
    parser: parser.configure({
        props: [
            indentNodeProp.add({
                Application: delimitedIndent({ closing: ')', align: false }),
            }),
            foldNodeProp.add({
                Application: foldInside,
            }),
            styleTags({
                'for while loop if else try catch return break continue': t.controlKeyword,
                in: t.operatorKeyword,
                'let fn enum': t.definitionKeyword,
                'import from': t.moduleKeyword,
                as: t.keyword,
                Bool: t.bool,
                null: t.null,
                Type: t.typeName,
                'VariableName/Ident': t.variableName,
                'CallExpr/VariableName/Ident': t.function(t.variableName),
                Property: t.propertyName,
                'CallExpr/MemberExpr/Property': t.function(t.propertyName),
                'FnExpr/Ident': t.function(t.variableName),
                'EnumVariant/EnumVariantBase/Ident': t.className,
                'EnumVariant/Ident': t.standard(t.function(t.variableName)),
                'EnumDefinition/Ident': t.className,
                'EnumDefinition/EnumInner/Ident': t.standard(t.function(t.variableName)),
                'Parameters/Ident': t.local(t.variableName),
                Comment: t.lineComment,
                Number: t.number,
                String: t.string,
                '+ - "*" "/" % "**"': t.arithmeticOperator,
                '|| &&': t.logicOperator,
                '< <= > >= "!=" ==': t.compareOperator,
                '=': t.definitionOperator,
                '( ) { } [ ]': t.bracket,
                '. , ;': t.separator,
                BuiltinFunc: t.standard(t.function(t.variableName)),
                BuiltinVar: t.standard(t.variableName),
            }),
        ],
    }),
    languageData: {
        commentTokens: { line: '#' },
    },
})

export function Homescript() {
    return new LanguageSupport(HomescriptLanguage)
}
