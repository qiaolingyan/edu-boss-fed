module.exports = {
  root: true,
  env: {
    node: true
  },
  // 插件：扩展了校验规则
  extends: [
    'plugin:vue/essential', // eslint-plugin-vue
    '@vue/standard', // @vue/eslint-config-standard
    '@vue/typescript/recommended' // @vue/eslint-config-typescript
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  // 自定义编码校验规则
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 0,
    // 'semi': ['error', 'always']
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': true
      }
    }]
  }
}
