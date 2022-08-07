/* eslint-disable global-require */
import alias from '@rollup/plugin-alias';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

import defines from './defines';
import external from './external';

const { webpackAlias } = require('../tsinfo');

const extensions = ['.js', '.ts'];

export default {
  input: 'src/ijest/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'es',
    },
  ],
  external,
  plugins: [
    // https://www.npmjs.com/package/@rollup/plugin-replace
    replace({
      preventAssignment: true,
      values: defines,
    }),

    alias({
      entries: webpackAlias,
    }),

    // 将CommonJS模块转换成ES6，防止他们在Rollup中失效;
    commonjs(),

    nodeResolve({
      extensions,
      browser: false,
    }),

    babel({
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/preset-env',
          {
            loose: true,
            useBuiltIns: 'entry',
            corejs: 3,
          },
        ],
        ['@babel/preset-typescript', {}],
      ],
      plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]],
      extensions,
      exclude: 'node_modules/**', // 只编译源代码
    }),

    // https://github.com/terser/terser#minify-options
    terser(),
  ],
};
