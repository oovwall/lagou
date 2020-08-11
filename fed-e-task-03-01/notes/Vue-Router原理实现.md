# Vue-Router原理实现

## History模式的使用
### 服务器端配置
> History需要服务器的支持，因为单页应用中，服务端不存在 http://www.testurl.com/login 这样的地址，直接从浏览器输入会返回找不到该页面。在服务端应该除了静态资源外都返回单页应用的index.html。

1. 在Node服务器中History模式的配置
```js
const path = require('path')
const history = require('connect-history-api-fallback')
const app = require('express')()

// 设置history
app.use(history())

// 处理网站静态资源的中间件，根目录为 ../web
app.use(express.static(path.join(__dirname, '../web')))

app.listen(3000, () => {
  console.log('服务器已启动')
})
```

1. 在Nginx服务器中History模式的配置
```shell script
server {
    # ...
    location / {
      root html;
      index index.html index.htm;
      try_files $uri $uri/ index.html; # 设置内容
    }
    # ...
}
```
