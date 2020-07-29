# 作业
## 简答题
1. Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。  
    1. 根据配置找到其中一个文件作为打包入口
    1. 根据入口文件中的代码出现的import或require之类的语句推断这个文件所依赖的资源模块
    1. 然后分别去解析每个资源模块对应的依赖，形成整个项目所有文件之间的一个依赖关系的依赖树
    1. 根据依赖树webpack进行递归，找到每个节点所对应的资源文件
    1. 最后再根据配置文件中的rules属性去找到这个模块所对应的加载器(Loader)，把Loader加载到的结果放到bundler.js中，这样就实现了整个项目的打包。

1. Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。  
  Loader专注于实现资源模块加载，从而去实现整个项目的打包。而Plugin是除了资源加载以外一些自动化工作，例如：可以在打包前自动清除项目的dist目录，或者拷贝不参与打包的项目资源文件到输出目录，亦或是压缩打包后的代码。`Loader` 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。`Plugin` 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。
  
  - 开发Loader思路
    1. 创建该loader的js文件，用`module.exports`导出一个带参函数，函数的参数为读到文件的内容，经过转换return为标准的js代码
    1. 在webpack.config.js中配置rules匹配所需处理的文件的后缀名，在use属性中设置该loader的js文件的相对路径，如果需要进行多次处理则依次设置多个loader
    1. 发布到npm上。
    
  - 开发Plugin思路
    1. 创建一个包含apply方法的类，这个方法会在webpack启动时自动被调用。该方法接收一个compiler的参数，这个参数对象包含了此次构建的所有配置信息。
    1. 通过compiler对象注册勾子函数
    1. 最后在webpack.config.js的plugins上加入这个包含apply方法的类的对象



## 编程题

1. 使用 Webpack 实现 Vue 项目打包任务
    [Webpack 打包Vue](https://gitee.com/oovwall/vue-app-base)
    > 讲解文件请下载：[01.webpack打包vue项目演示.mov](./movie/01.webpack打包vue项目演示.mov)
