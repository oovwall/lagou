# Webpack打包

## 模块化打包工具
打包工具解决的是前端整体的模块化，并不单指Javascript的模块化。

## Webpack核心特性
1. 模块打包器（Module bundler）- 解决模块化打包的问题 *（处理import和export的问题)*
1. 代码拆分（Code Splitting）- 首次加载应用中做必须加载的模块，之后再根据需要进行渐进式加载，这样就不用担心文件太碎，或文件太大这两个极端的问题
1. 资源模块（Asset Module）- 以模块化的方式载入任意类型的资源文件

## Webpack上手
### 指定webpack工作模式
- 命令行
    ```bash
    $ yarn webpack --mode production
    $ yarn webpack --mode development
    $ yarn webpack --mode none  # 原始状态的打包
    ```

- 配置文件
    ```js
    module.exports = {
      mode: 'production'
    }
    ```

## Webpack 打包结果运行原理
1. Webpack生成的代码是一个立即执行函数，这个函数是Webpack的工作入口，它接受一个modules的参数，调用时我们传入了一个数组。
1. 数组的每一项都是参数列表相同的函数，这里的函数就是对应源代码中的模块。我们的模块都会最终包裹在这样的函数当中，形成模块的私有作用域。
1. 入口函数中先定义一个对象`installedModules`用来储存已加载过的模块
1. 定义一个专门加载模块的函数`__webpack_require__`，然后在这个require函数上挂载了一些数据和工具函数
1. 最后调用这个`__webpack_require__`函数，传入了参数0，开始调用这个模块
1. 在这个函数内部，先判断这个模块有没有被加载过，如果加载了就从缓存里面读，如果没有加载就创建一个新的对象`module`
1. 创建完后紧接着去调用这个模块所对应的函数，把刚刚创建的模块对象、导出成员对象、require函数传入

bundler大概骨架
```js
(function(modules) {
  // The module cache
  var installedModules = {}

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    if (installedModules[moduleId]) {
     return installedModules[moduleId].exports
    }

    // Create a new module and put it into the cache
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    }
    // Execute the module function
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)

    module.l = true
    return module.exports
  }

  __webpack_require__.m = modules
  __webpack_require__.c = installedModules
  // ...
  // ...

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = 0)
})([ 
(function (module, __webpack_exports__, __webpack_require__) {}), // 函数1，对应源代码中的模块
(function (module, __webpack_exports__, __webpack_require__) {}) // 函数2
])
```

## Webpack 资源模块加载
相应的资源文件需要相应的加载器(Loader)，Loader是Webpack的核心特性
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggrkeukzm0j31dw0mc44b.jpg)

常见的Loader
- css-loader *编译转换类Loader*
- style-loader *编译转换类Loader*：将样式通过style标签注入
- html-loader *编译转换类Loader*
- babel-loader *编译转换类Loader*
- file-loader *文件操作类Loader*
- src-loader *文件操作类Loader*
- eslint-loader *代码检查类Loader*

常见的Plugin
- clean-webpack-plugin
- html-webpack-plugin
- copy-webpack-plugin

## Webpack加载资源的方式 
- 遵循ES Modules标准的import声明
- 遵循CommonJS标准的require函数
- 遵循AMD标准的define函数和require函数
- *样式代码中的@import指令和url函数
- *HTML代码中的图片标签的src属性

## Webpack核心工作原理
以一个普通的前端项目为例，在我们项目当中一般都会散落着各种各样的代码及资源文件，那Webpack可能会根据我们的配置找到其中的一个文件作为打包的入口，那一般情况下这个文件都会是一个JavaScript文件，然后它会去顺着我们入口文件当中的代码，根据代码中出现的import或者像require之类的语句，然后解析推断出来这个文件所依赖的资源模块，然后分别去解析每个资源模块对应的依赖，那最后就形成了整个项目中所有用到文件之间的一个依赖关系的一个依赖树，有了这个依赖关系树过后Webpack会以遍历，或者更准确的说法叫递归这个依赖树，然后找到每个节点所对应的资源文件，最后再根据我们配置文件中的rules属性去找到这个模块所对应的加载器，然后交给对应的加载进去加载这个模块，那最后呢会将加载到的结果放入到bundler.js，也就是我们的打包结果当中，从而去实现我们整个项目打包。整个过程中Loader的机制其实起了很重要的一个作用，因为如果没有的话，他就没有办法去实现各种各样的资源文件的加载，那对于他来说，他也就只能算是一个用来去打包或者合并其他模块代码的工具了。

## Webpack 开发一个Loader
Loader负责资源从输入到输出的转换，对于同一个资源可以依次使用多个Loader

- Loader和Plugin有什么区别？  
  Loader专注于实现资源模块加载，从而去实现整个项目的打包。而Plugin是除了资源加载以外一些自动化工作，例如：可以在打包前自动清除项目的dist目录，或者拷贝不参与打包的项目资源文件到输出目录，亦或是压缩打包后的代码。  
  
## Webpack Dev Server
Webpack Dev Server主要是为我们Webpack构建的项目提供了一个比较友好的开发环境和一个可以用来调试的开发服务器。

- 自动刷新导致页面状态丢失的问题，如：文本框内文字在刷新后丢失？  
  在Webpack中开启HMR(Hot Module Replacement，模块热更新)

## Source Map
Source Map是在源JS的底部添加特定的注释格式
```js
//# sourceMappingURL = jquery-3.4.1.min.map
```
Source Map的作用是我们在前端方向引入了构建编译之类的概念过后，导致我们前端编写的源代码与运行的代码之间不一样所产生的那些调试的问题。

### 在Webpack中配置Source Map
```js
module.exports = {
  devtool: 'source-map' // none, eval, eval-source-map, cheap-eval-source-map, cheap-module-eval-source-map, cheap-source-map, inline-source-map, hidden-source-map, nosources-source-map
}
```
在实际开发中最适合选择cheap-module-source-map
1. cheap会省略出错列信息，一般来说在项目中能定位到行的错误就知道错误所在
1. 一般项目中使用的Loader比较多，转换过后的差异较大，能直接定位Loader转换前的代码非常直观且必要
1. 重新打包速度较快

## Webpack 不周环境的配置文件
webpack可以把不同环境的配置写在不同的文件中进行按需加载

示例：webpack.prod.js
```js
const common = require('./webpack.common')
const merge = require('webpack-merge') // 专门合并webpack配置的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin(['public'])
  ]
})
```
webpack打包时用
```bash
yarn  webpack --config webpack.prod.js
```

## Webpack使用Tree Shaking和sideEffects
在Webpack production模式中，默认自动开启Tree Shaking。如果要在none模式中手动开启，需要做如下设置
```js
module.exports = {
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: 'bundler.js'
  },
  optimization: {
    sideEffects: true,  // 副作用，如果在package.json中有sideEffects: false（标识代码没有副作用），那webpack打包时不会打包未使用到的模块，这对整个项目的体积优化很有好处
    usedExports: true,  // 只打包使用到的代码
    concatenateModules: true, // Scope Hoisting, 尽可能的将所有模块合并输出到一个函数中，既提升了代码的运行效率，又减少了代码的体积
    minimize: true  // 开启压缩
  }
}
```
> 关于sideEffects，可以在package.json中指定副作用的文件列表 sideEffects: ["./src/extend.js", "*.css"]

## Webpack多入口打包和提取公共模块
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'none',
  entry: {
    index: './src/index.js',
    album: './src/album.js',
  },
  output: {
    filename: '[name].bundler.js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all' // 把所有的公共模块都提取到单独的bundler中
    }
  },
  module: {
    rules: [{
      test: /.js$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }]
  },
  plugin: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/index.html',
      filename: 'index.html',
      chunks: 'index'
    }),
    new HtmlWebpackPlugin({
      title: 'Multi Entry',
      template: './src/album.html',
      filename: 'album.html',
      chunks: 'album'
    })
  ]
}
```

## Webpack动态导入
```js
// 静态导入
import posts from './posts/posts'

// 动态导入
import('./posts/posts').then(({ default: posts }) => {
  mainElement.appendChild(posts())
})
```

## Webpack魔法注释
```js
// 多个动态导入用同一个chunk name可以自动打包到一起
import(/* webpackChunkName: 'posts'*/'./posts/posts').then(({ default: posts }) => {
  mainElement.appendChild(posts())
})
```
