const Koa = require('koa'); // 导入koa
const app = new Koa(); // 创建服务端实例对象
const views = require('koa-views'); // 导入了处理动态资源包
const json = require('koa-json'); // 导入了输出json格式的包
const onerror = require('koa-onerror'); // 导入了处理错误的包
const bodyparser = require('koa-bodyparser'); // 导入了处理post请求参数包
const fs = require('fs');
const path = require('path');
const logger = require('koa-morgan');
require('./db/sync');
const session = require('koa-generic-session'); // 导入保存登录状态的包
const redisStore = require('koa-redis');
const {REDIS_CONFIG} = require('./config/db');
/*
1.Cookie的跨域问题
Cookie是不能跨域使用的, 所以在前后端分离开发的时候, 我们当前的代码就会出现问题
例如:
前端地址: http://192.168.0.107:3001/login.html
后端地址: http://127.0.0.1:3000/api/user/test

2.什么是跨域?
https://www.it666.com:3000
http://www.it666.com:3000

协议/一级域名/二级域名/端口号 有一个不同就是跨域
由于3000端口和3001端口不同, 所以就是跨域
所以我们在3000端口设置的cookie3001是不能使用的
    我们在3001端口设置的cookie3000也是不能使用的

3.如何解决前后端分离Cookie的跨域问题?
通过Nginx反向代理
http://nginx.org/en/download.html
* */
/*
1.正向代理
顺着请求的方向进行的代理, 我们称之为正向代理
例如: 访问谷歌
我是一个用户，我访问不了谷歌, 但是我可以访问一台海外的服务器, 这台海外服务器又可以访问谷歌
那么'我'就可以先访问'海外的服务器', 再通过'海外的服务器'访问谷歌, 这就是正向代理

2.正向代理特点
- 在正向代理中, 代理服务器是为用户服务的,
  (对于谷歌来说, 它并不知道真正访问自己的是谁, 只知道有一台服务器访问了自己)

3.正向代理的用途
- 访问原来无法访问的资源，如google
- 对客户端访问授权，上网进行认证
- ... ...
* */
/*
1.反向代理
反向代理和正向代理正好相反, 反向代理服务器是为'服务器'服务的
 (对于用户来说, 它并不知道自己真正访问的是谁, 只知道自己访问了一台服务器)

2.反向代理的用途
- 负载均衡，通过反向代理服务器来优化网站的负载
- 前后端分离, 统一请求地址
* */
const user = require('./routes/user'); // 导入了封装好的路由

// error handler
onerror(app); // 告诉系统需要捕获哪一个程序的错误

// 注册了解析post请求参数的中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));
app.use(json());
// 注册了记录日志的中间件
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' });
app.use(logger('combined', {
  stream: accessLogStream
}));
// 注册了处理静态资源的中间件
app.use(require('koa-static')(__dirname + '/public'));
// 注册了处理动态资源的中间件
app.use(views(__dirname + '/views', {
  extension: 'pug'
}));

// 记录日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});
// 配置保存登录状态的中间件
app.keys = ['COM.it666.*?']; // 用于生成无关紧要的userId的
app.use(session({
  cookie:{
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
  })
}));

// 注册启用了路由
app.use(user.routes(), user.allowedMethods());

// 处理错误
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
