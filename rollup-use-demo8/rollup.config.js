import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

export default {
  entry: './src/index.js',
  targets: [{
    format: 'iife',
    name: 'indexTest',
    dest: './dist/dist.iife.js'
  }],
  external: ['zepto'],
  globals: {
    zepto: '$'
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify()
  ]
};
