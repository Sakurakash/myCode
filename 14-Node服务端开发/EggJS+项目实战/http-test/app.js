// 1.导入Koa
const Koa = require('koa');
const Router = require('koa-router'); // 导入处理路由的模块
const router = new Router(); // 创建路由对象
const bodyParser = require('koa-bodyparser'); // 导入处理post请求参数的模块

// 2.创建服务端实例对象
const app = new Koa();

app.use(bodyParser()); // 注册处理post请求参数的中间件
// 处理路由
router.get('/getUser', (ctx, next)=>{
    ctx.body = {
        method: 'get',
        name:'lnj',
        age: 33
    }
});
router.get('/getUser2', (ctx, next)=>{
    ctx.body = ctx.query;
});
router.post('/getNews', (ctx, next)=>{
    ctx.body = {
        method: 'post',
        title:'我是标题',
        content: '我是正文'
    }
});
router.post('/getNews2', (ctx, next)=>{
    ctx.body = {
        method: 'post',
        title:'我是标题',
        content: ctx.request.body
    }
});
let count = 1;
router.get('/getMsg', (ctx, next)=>{
    ctx.body = `我是新的消息${count++}`;
});
app
    .use(router.routes()) // 启动路由功能
    .use(router.allowedMethods()); // 自动设置响应头

// 3.指定监听的端口
app.listen(3000);