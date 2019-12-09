
> 命令一览
```
npm install koa-generator -g # 全局安装koa脚手架
koa2 blog-koa2 # 
npm install koa-generic-session #
npm install koa-redis #
npm install redis # 
npm install mysql # 
npm install xss # 防xss攻击
npm install koa-margan # 记录日志

npm install pm2 -g # 
```

---
> pm2命令
```
pm2 start ... #
pm2 list # 显示表
pm2 restart <AppName>/<id> # 重启<id>=0的项目
pm2 stop <AppName>/<id> # 停止
pm2 delete <AppName>/<id> # 删除
pm2 info <AppName>/<id> # 显示信息
pm2 log <AppName>/<id> #  显示日志
pm2 monit <AppName>/<id> # 打开监控窗口

```
---

> koa异步处理基础 async-await 
```
// async await 要点
// 1. await 后面可追加 promise 对象
// 2. await 必须包裹在 async 函数里
// 3. async 函数执行返回的也是一个promise对象
// 4. try-catch 截获 promise 中 reject 的值
```