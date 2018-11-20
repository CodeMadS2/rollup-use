import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
export default {
  entry: './src/index.js',
  targets: [{
    format: 'es',
    dest: './dist/dist.es.js'
  },{
    format: 'iife',
    name: 'indexTest',
    dest: './dist/dist.iife.js'
  }, {
    format: 'umd',
    name: 'indexTest',
    dest: './dist/dist.umd.js'
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
    })
  ]
}
