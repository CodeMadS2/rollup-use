import babel from 'rollup-plugin-babel';
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
    name: 'umdIndexTest',
    dest: './dist/dist.umd.js'
  }],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}