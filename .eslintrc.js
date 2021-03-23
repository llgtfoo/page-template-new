module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  // "extends": [
  //     "eslint:recommended",
  //     "plugin:vue/essential"
  // ],
  'extends': '@ourea/eslint-config-tq/vue',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'vue',
  ],
  'rules': {
    'no-magic-numbers': 0,
    'no-console': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/html-self-closing': 0,
    'no-debugger': 0,
  },
}
