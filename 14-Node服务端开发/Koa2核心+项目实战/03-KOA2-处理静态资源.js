/*
1.Koa如何处理静态资源?
Koa是一个轻量级的框架, 它将所有的附加功能都封装到了独立的模块中
所以想要使用这些功能, 都必须先安装才能使用

https://www.npmjs.com/package/koa-static
* */
// 1.导入Koa
const Koa = require('koa');
const serve = require('koa-static'); // 导入处理静态资源的模块
// 2.创建服务端实例对象
const app = new Koa();

app.use(serve('public')); // 注册处理静态资源的中间件
// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

// 3.指定监听的端口
app.listen(3000);
