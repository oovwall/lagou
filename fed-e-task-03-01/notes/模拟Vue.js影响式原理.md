# 模拟Vue.js影响式原理

## 总体流程
![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghi0h600d9j315i0jkn4x.jpg)

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghjb5y677yj31mm0u0ar9.jpg)

## 实现步骤  
    要实现mvvm的双向绑定，就必须要实现以下几点： 
    1. 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者
    1. 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数
    1. 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图
    1. mvvm入口函数，整合以上三者

## 相关链接
[剖析Vue原理&实现双向绑定MVVM](https://mp.weixin.qq.com/s?__biz=MzI3NTM1MjExMg==&mid=2247483789&idx=1&sn=e7297ec3443007015117637709f27521&scene=21#wechat_redirect)
