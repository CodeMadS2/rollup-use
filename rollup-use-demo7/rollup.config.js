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
    format: 'amd',
    dest: './dist/dist.amd.js'
  }],
  external: ['zepto'],
  paths: {
    zepto: 'https://cdn.bootcss.com/zepto/1.2.0/zepto.js'
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
