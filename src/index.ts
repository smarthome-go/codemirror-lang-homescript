import {
    delimitedIndent,
    foldInside,
    foldNodeProp,
    indentNodeProp,
    LanguageSupport,
    LRLanguage,
} from '@codemirror/language'
import { completeFromList } from '@codemirror/autocomplete'
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
                'for while loop if else match try catch return break continue impl': t.controlKeyword,
                'in new': t.operatorKeyword,
                'let fn type templ trigger': t.definitionKeyword,
                'pub event': t.modifier,
                'import from': t.moduleKeyword,
                'ImportItem/Module/Ident': t.namespace,
                // 'ImportItem/ImportItemCanditate/Ident': t.namespace,
                'ImportItem/ImportItemCanditate/TypeImport/Ident': t.typeName,
                'ImportItem/ImportItemCanditate/TemplImport/Ident': t.namespace,
                'ImportItem/ImportItemCanditate/TriggerImport/Ident': t.local(t.variableName),
                "Annotation": t.separator,
                "TriggerConnective": t.operatorKeyword,
                "ImplTemplateIdent/Ident": t.namespace,
                "SingletonIdent/Ident": t.typeName,
                'TypeDefinition/Ident': t.namespace,
                'FunctionDefinition/Ident': t.function(t.variableName),
                'ObjectTypeFieldKey/Ident': t.propertyName,
                'ObjectTypeFieldAnnotation ObjectTypeFieldAnnotation/Ident': t.separator,
                as: t.keyword,
                Boolean: t.bool,
                null: t.null,
                none: t.null,
                'CallExpression/CallBase/Expression/ExpressionWithoutBlock/VariableName/Ident': t.function(t.propertyName),
                'ObjectLiteral/Ident': t.propertyName,
                'MemberExpression/Ident': t.propertyName,
                'FunctionDefinition/parameterList/Ident': t.local(t.variableName),
                'ForStatement/Ident': t.local(t.variableName),
                'Parameters/Ident': t.local(t.variableName),
                'VariableName/Ident': t.variableName,
                LineComment: t.lineComment,
                BlockComment: t.blockComment,
                Number: t.number,
                String: t.string,
                'Arrow QuestionMark': t.typeOperator,
                'FatArrow': t.controlOperator,
                'Plus Minus Multiply Divide Modulo Power': t.arithmeticOperator,
                'LogicalOr LogicalAnd': t.logicOperator,
                'LessThan LessThanEqual GreaterThan GreaterThanEqual NotEqual Equal': t.compareOperator,
                'AssignOp`': t.definitionOperator,
                '"(" ")" "{" "}" "[" "]"': t.bracket,
                '"." ".." "," ";"': t.separator,
                BuiltinFunc: t.standard(t.function(t.variableName)),
                'Type/Word': t.typeName,
            }),
        ],
    }),
    languageData: {
        commentTokens: { line: '//' },
    },
})

export const HomescriptCompletion = HomescriptLanguage.data.of({
    autocomplete: completeFromList([
        { label: 'pub', type: 'keyword' },
        { label: 'new', type: 'keyword' },
        { label: 'fn', type: 'keyword' },
        { label: 'let', type: 'keyword' },
        { label: 'return', type: 'keyword' },
        { label: 'break', type: 'keyword' },
        { label: 'continue', type: 'keyword' },
        { label: 'if', type: 'keyword' },
        { label: 'else', type: 'keyword' },
        { label: 'match', type: 'keyword' },
        { label: 'loop', type: 'keyword' },
        { label: 'while', type: 'keyword' },
        { label: 'for', type: 'keyword' },
    ]),
})

export function Homescript() {
    return new LanguageSupport(HomescriptLanguage, [HomescriptCompletion])
}
