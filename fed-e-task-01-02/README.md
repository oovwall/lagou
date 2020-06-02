# Javascript深度剖析 模块二作业

## 简答题
1. 描述引用计数的工作原理和优缺点
    1. 引用计数算法的工作原理是：设置一个计数器来维护一个对象的引用数，如果引用关系改变时则修改引用数值，如果引用数值为0时则GC工作回收当前对象空间。
    1. 引用计数算法的优点：
         - 发现垃圾时立即回收
         - 最大限度减少程序暂停
                 
    1. 引用计数算法的缺点
         - 无法回收循环引用的对象
         - 时间开销大

1. 描述标记整理算法的工作流程  
    先找出所有的可达对象，如果涉及层次引用的关系，会递归查找对象。然后对这些可达的活动对象进行标记。再然后执行整理操作，移动活动对象的位置让它们的地址连续。最后清除非活动的对象空间。这个算法的好处是：不会大批量出现分散的小空间，而回收到的空间地址基本上是连续的，在后续的使用中就可以尽可能地使用到内存中释放出来的空间。 
    
1. 描述V8中新生代存储区垃圾回收的流程  
   -- 新生代是指存活时间较短的对象。新生代回收过程采用复制算法+标记整理算法  
   1. 新生代内存区分为二个等大小的空间
   1. 使用空间为From，空闲空间为To
   1. 代码执行时，把所有的活动对象存储于From空间
   1. 当程序执行到一定程度后，触发了GC，通过标记整理后将活动对象拷贝至To
      > *拷贝操作时有两种情况新生代对象会出现晋升至老生代对象：1. 一轮GC还存活的新生代需要晋升。2. To空间的使用率超过25%的新生代需要晋升。*
   1. From与To交换空间，将原From空间释放
   
1. 描述增量标记算法在何时使用，及工作原理  
   增量标记算法在老在生对象的回收时使用。增量标记算法的工作原理是将一整段的GC操作拆分成多个小部，组合完成整个回收，可以实现垃圾回收与程序执行交交替地完成，这样对时间的消耗更为合理。
   
## 代码题1
### 练习1
```js
const fp = require('lodash/fp')

const cars = [
  {
    name: 'Ferrari FF',
    horsepower: 660,
    dollar_value: 700000,
    in_stock: true
  },
  {
    name: 'Spyker C12 Zagato',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false
  },
  {
    name: 'Jaguar XKR-S',
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false
  },
  {
    name: 'Audi R8',
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false
  },
  {
    name: 'Aston Martin One-77',
    horsepower: 750,
    dollar_value: 1850000,
    in_stock: true
  },
  {
    name: 'Pagani Huayra',
    horsepower: 700,
    dollar_value: 1300000,
    in_stock: false
  }
]

let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
console.log(isLastInStock(cars)) // false
```

### 练习2
```js
let isFistInStock = fp.flowRight(fp.prop('in_stock'), fp.first)
console.log(isFistInStock(cars)) // true
```

## 代码题2

