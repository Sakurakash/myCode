/*
1.Koa如何处理路由?
Koa是一个轻量级的框架, 它将所有的附加功能都封装到了独立的模块中
所以想要使用这些功能, 都必须先安装才能使用

https://www.npmjs.com/package/koa-router
https://github.com/ZijianHe/koa-router
* */
// 1.导入Koa
const Koa = require('koa');
const serve = require('koa-static'); // 导入处理静态资源的模块
const views = require('koa-views'); // 导入处理动态资源的模块
const Router = require('koa-router'); // 导入处理路由的模块
const router = new Router(); // 创建路由对象

// 2.创建服务端实例对象
const app = new Koa();

app.use(serve('public')); // 注册处理静态资源的中间件
app.use(views('views', {extension: 'ejs'})); // 注册处理动态资源的中间件

// koa中的ctx就是express中的req,res的结合体
// app.use( async (ctx, next) => {
//     // ctx.body = 'Hello Koa';
//     await ctx.render('index', {msg: 'com.it666.www'});
// });

// 处理路由
router.get('/api/goods/list', (ctx, next)=>{
    ctx.body = 'get /api/goods/list'; // ctx.body === res.writeHeader + res.end
});
router.get('/api/user/login', (ctx, next)=>{
    ctx.body = {
        method: 'get',
        name: 'lnj',
        age: 66
    }
});
router.post('/api/goods/detail', (ctx, next)=>{
    ctx.body = 'post /api/goods/detail';
});
router.post('/api/user/register', (ctx, next)=>{
    ctx.body = {
        method: 'post',
        name: 'it666',
        age: 33
    }
});

app
    .use(router.routes()) // 启动路由功能
    .use(router.allowedMethods()); // 自动设置响应头

// 3.指定监听的端口
app.listen(3000);