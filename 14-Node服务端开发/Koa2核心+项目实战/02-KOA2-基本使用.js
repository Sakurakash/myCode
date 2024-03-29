/*
1.如何使用Koa?
1.1手动安装手动配置
1.2利用Koa脚手架工具安装使用(Koa-generator)

2.手动安装手动配置
https://www.npmjs.com/package/koa
* */
// 1.导入Koa
const Koa = require('koa');
// 2.创建服务端实例对象
const app = new Koa();

// response
app.use(ctx => {
    ctx.body = 'Hello Koa';
});

// 3.指定监听的端口
app.listen(3000);