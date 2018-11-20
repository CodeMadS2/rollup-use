import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import _extend from 'lodash/extend';

let isDev = process.env.NODE_ENV === 'dev';

// 书写自己需要的配置项
const baseParamsConfig = {
  entry: './src/index.js',
  targets: [{
    format: 'iife',
    name: 'indexTest',
    dest: './dist/dist.iife.js'
  }],
  external: ['zepto'],
  globals: {
    zepto: '$'
  }
};
const devPlugins = [
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
];
const prodPlugins = [
  uglify()
];

// TODO: 结合自己情况去处理
let devConfig = _extend({}, {sourceMap : true}, baseParamsConfig, {
  plugins: devPlugins
});
let prodConfig = _extend({}, baseParamsConfig, {
  plugins: prodPlugins
});

export default isDev ? devConfig : prodConfig;
