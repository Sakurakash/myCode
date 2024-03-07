const Koa = require('koa') // 导入koa
const app = new Koa() // 创建服务端实例对象
const views = require('koa-views') // 导入了处理动态资源包
const json = require('koa-json') // 导入了输出json格式的包
const onerror = require('koa-onerror') // 导入了处理错误的包
const bodyparser = require('koa-bodyparser') // 导入了处理post请求参数包
const logger = require('koa-logger') // 导入了记录日志包

const index = require('./routes/index') // 导入了封装好的路由
const users = require('./routes/users')

// error handler
onerror(app) // 告诉系统需要捕获哪一个程序的错误

// 注册了解析post请求参数的中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
// 注册了记录日志的中间件
app.use(logger())
// 注册了处理静态资源的中间件
app.use(require('koa-static')(__dirname + '/public'))
// 注册了处理动态资源的中间件
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 记录日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 注册启用了路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// 处理错误
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
