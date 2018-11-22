/** @format */

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 我自訂的
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        insertPragma: true,
        requirePragma: false
      }
    ],
    indent: [
      'error',
      2,
      {
        MemberExpression: 1
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
