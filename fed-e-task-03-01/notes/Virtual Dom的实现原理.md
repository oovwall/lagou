# Virtual Dom的实现原理

## 虚拟DOM
### 什么是虚拟DOM
    是由普通的JS对象来描述HTML对象，因为不是真实的DOM对象，所以叫虚拟DOM。
    
### 为什么使用Virtual Dom
1. 手动操作DOM比较麻烦，还需要考虑兼容性的问题
1. 为了简化操作我们可以使用模板引擎，但是模板引擎没有解决状态变化的问题
1. Virtual Dom好处是在状态改变的情况下不立即更新DOM，只需要一个虚拟树来描述DOM，虚拟DOM可以维护程序的状态，跟踪上一次的状态，通过比对两次的状态差异更新真实的DOM

## Snabbdom
### 安装Snabbdom
```
yarn add snabbdom
```


