# 前言

最近接触到公司前端组件库以及工具的一些构建，由于需要考虑的项目较多，发现前端工具也很多，比如：fis3，gulp，Browserify，webpack等，综合考虑，我拾起了rollup构建工具(使用ES6模块语法)进行前端库的构建，为此我将自己所遇到的问题总结如下，以便更好的提升。

## 快速入门

直接使用 `npm i -g rollup` 安装，当然你也可以在依赖于自己的项目进行安装 `npm i rollup --save-dev`，如果出现错误，建议小伙伴将源切换至阿里云 `npm config set registry https://registry.npmjs.org/` 或者是手机开个热点进行包下载。

此时建议小伙伴把官网先通读下，不要纠结细节，过一次。

我以文件小例子的形式进行使用说明，如有不对，请多多指教。

## rollup-use-demo

此例子是个简单的入手操作，代码就不贴了，自己例子里面看，你只需要知道有这个命令 `rollup src/index.js -f es -o dist/index.js` 就可以了, `-o` 指明输出目标。

1.在使用时，请将文件路径写完整，避免受一些构建工具的影响，防止报错

2.由于新版本的影响，此是你需要命令行表明你编译的format ，用 `-f` 指明

## rollup-use-demo1

我们看到了有个参数 `-f` ，下面我们就谈谈这个，随着node的近两年的发展，前端发展越来越火，在node端采用了commonjs(下面简称cjs)语法，es6的推出更加推动了其发展，尤其在前端框架形形色色，都知道目前的3大主流框架(react, vue, react)采用了很多es6的写法，给人更加快捷高效的体验，那么我们平时使用的包也很多，如果你想自己做一个包，那么 `-f` 的作用就产生了，它包括的参数有 `amd`，`cjs`，`es`，`iife`，`umd`，下面我们来看例子。运行 `npm run build:all`，是不是看到熟悉的代码。

## rollup-use-demo2

有没有感觉命令行构建的比较繁琐，可视化性不强，那么rollup也可以通过配置文件的方式进行构建配置。

**ps：**这里你注意下 `iife` 或者是 `umd` 模块打包时你需要手动命名自己的模块名，这个模块名用来指向你入口文件导出的内容，否则会报错。

可是感觉还缺点什么，我之前可以执行一次命令输出很多的模块结果，现在是否也可以实现呢，当然可以，rollup可以让我们导出的配置文件为数组格式(查看`rollup.modules.config.js`配置文件)，当然对于强迫症的你可能不喜欢这么多的数组想，感觉不直观，再来一种方式(`rollup.targets.config.js`)

## rollup-use-demo3


是不是感觉每次打包都要手动，感觉效率不高，那就看这里吧，这里用到了重要的参数 `-w` 和模块 `rollup-watch`。

```
npm i rollup-watch --save-dev //执行此命令
```

配置好参数后
```
rollup -c rollup.config.js -w //开始监听
```
**ps：** `watch`配置参数你可以[点击这里](https://www.rollupjs.com/guide/zh#-danger-zone-)。

## rollup-use-demo4

此时的你可能会考虑，这工具确实不错，但是市面上这么多的浏览器，我该怎么做兼容呢，莫慌，rollup虽然支持了es6，但是对于转换为大部分浏览器支持的语法需要借助第三方模块 `rollup-plugin-babel`，`babel-preset-es2015`。

```
npm i rollup-plugin-babel @babel/preset-env --save-dev //执行此命令
```

项目根目录创建`.babalrc`文件

```
{
  "presets": [
    ["@babel/preset-env", {
       "modules": false
    }]
  ]
}
```
**ps：** `rollup `默认是不支持解析common.js的模块规范的，所以在模块中不转换模块相关的语法，对于参数的说明参考 [babel 官网]()

```
plugins: [
	babel({
	  exclude: 'node_modules/**'
	})
]
```
在配置文件中，你需要加入babel插件进行处理，打包后的文件就可以在我们的主流浏览器中运行。

## rollup-use-demo5

到了这里你可能会想，我自己写的模块我自己的可以打包，可是针对别人写的包，我怎么处理呢，形形色色，风格，语法规范都不一样，比如 `cjs`，我们以 npm库中的 `lodash` 为例。

我们需要做如下操作，其中 `rollup-plugin-commonjs` 将cjs模块转换为es模块，`rollup-plugin-node-resolve` 可以正确的识别npm包，自己会根据规则查找npm包，注意插件执行顺序。

```
npm i rollup-plugin-commonjs rollup-plugin-node-resolve lodash --save-dev //执行此命令

```
在 `rollup.config.js` 中

```
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
```
**ps：** 注意lodash的引入方式，不可以这样子处理 `import _ from 'lodash'` 这样子会导致一个结果 `lodash` 在打包后会被打包全部代码，不是我们需要的效果，我们可以这样子 `import concat from 'lodash/concat'`


## rollup-use-demo6

此时是不是感觉好快捷啊，可是有时候我们有些别的需求，比如：你不想把所有的文件全部打包到一个文件，一些第三方的库没啥必要打到一起，需要单独打包，配置文件中有个 `external` 可以满足你的需要。

配置中引入一下配置：

```
external: ['zepto'],
  globals: {
    zepto: '$'
}
```

这样子我们就可以把jquey单独使用了，没有打包到一起。


## rollup-use-demo7

有时候涉及到带有cdn的模块，这时候 `paths` 就派上用场了(`iife`模式不适用)，参考一下代码进行配置

```
external: ['zepto'],
	paths: {
	zepto: 'https://cdn.bootcss.com/zepto/1.2.0/zepto.js'
}
```

配置好后然后进行打包，我们发现cdn的地址已经被打包到里面了。

## rollup-use-demo8

下来我们谈谈代码的压缩，执行一下命令

```
npm install rollup-plugin-uglify --save-dev
```

然后配置文件中导入

```
mport { uglify } from 'rollup-plugin-uglify';
```

配置文件中最后一个插件增加此配置，当然里面还有很多参数，[点击这里](http://npm.taobao.org/package/rollup-plugin-uglify)结合自己的情况去配置。

```
uglify()
```
## rollup-use-demo9

都知道，我们的项目需要上线，那么我们的一些配置怎么区分线上和线下的了，你可能看过一些构建工具，包括 `**.config.dev.js` 和 `**.config.test.js` 和 `**.config.prod.js` 等，感觉很繁琐，你可能指向写一个配置文件，我们可以用变量来进行区分，经过查找文档 rollup 里面有这个参数 `environment`，我们可以在配置项里面进行获取值。

```
let isDev = process.env.NODE_ENV === 'dev';
```

## rollup-use-demo10

如果你看过很多组件或者框架的源码，比如jQuery，你会发现它的头部有这几行特殊的斑斑标识 `/*! jQuery v3.3.1 | (c) JS Foundation and other contributors | jquery.org/license */`, 奇怪它是怎么做到的呢，难不成每次都改吗，No，此时高级用法里面的 `banner` 参数该出场了，另外 `footer`, `intro`, `outro` 可自行查找官方文档。如果我实际的模块中有的模块涉及到的变量值和环境有关系，那我该怎么处理了，你可能会这么做，增加配置项，以便让全局生效，就可以使用了。

```
intro: 'var ENVIRONMENT = "production";'
```

这个办法也不是不能用，感觉会污染全局，我们可以这么做，使用插件 `rollup-plugin-replace`

```
replace({
	DEV: isDev,
	VERSION: '1.0.0',
	delimiters: ['<@', '@>']
})
```
