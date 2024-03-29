/*
1.Koa如何处理错误?
- 使用koa-onerror模块
https://www.npmjs.com/package/koa-onerror
* */
// 1.导入Koa
const Koa = require('koa');
const serve = require('koa-static'); // 导入处理静态资源的模块
const views = require('koa-views'); // 导入处理动态资源的模块
const Router = require('koa-router'); // 导入处理路由的模块
const router = new Router(); // 创建路由对象
const bodyParser = require('koa-bodyparser'); // 导入处理post请求参数的模块
const onerror = require('koa-onerror'); // 导入处理错误的模块

// 2.创建服务端实例对象
const app = new Koa();
onerror(app); // 告诉koa-onerror我们需要捕获所有服务端实例对象的错误

app.use(serve('public')); // 注册处理静态资源的中间件
app.use(views('views', {extension: 'ejs'})); // 注册处理动态资源的中间件
app.use(bodyParser()); // 注册处理post请求参数的中间件

// 处理路由
router.get('/api/user/login', (ctx, next)=>{
    ctx.body = '我是登录';
});
router.get('/api/user/register', (ctx, next)=>{
    ctx.body = '我是注册';
});
app
    .use(router.routes()) // 启动路由功能
    .use(router.allowedMethods()); // 自动设置响应头

// 处理错误
app.use((err, ctx) => {
    console.log(err.status, err.message);
    ctx.body = err.message;
});

// 3.指定监听的端口
app.listen(3000);