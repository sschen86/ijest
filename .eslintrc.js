const { eslintAlias } = require('./tsinfo');

module.exports = {
  root: true,
  extends: ['./npm/shushu.pro/eslint-config-base'],
  ignorePatterns: ['/node_modules/', 'temp', 'npm', 'dist'],
  rules: {
    // 允许多重三元运算符
    'no-nested-ternary': 'off',

    // FIXME:允许函数重载语法
    'no-redeclare': 'off',

    /** @description 设置同名变量规则 */
    '@typescript-eslint/no-shadow': [
      'warn',
      {
        builtinGlobals: false,
        hoist: 'functions',
        allow: ['data', 'option', 'value'],
      },
    ],

    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/src/index.ts'],
      },
    ],

    // 允许方法重载
    'no-dupe-class-members': 'off',
  },
  env: {
    // node: true,
    // es6: true,
    jest: true,
  },
  globals: {
    // .. jest: true,
  },
  settings: {
    'import/resolver': {
      // 别名配置
      // https://www.npmjs.com/package/eslint-import-resolver-alias
      alias: {
        map: eslintAlias,
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['webpack/**/*', 'rollup/**/*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
