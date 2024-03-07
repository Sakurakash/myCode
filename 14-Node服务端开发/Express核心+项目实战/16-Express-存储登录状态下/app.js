// 导入了一些第三方的模块
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./db/redis');

require('./db/sync');
// 导入了处理路由的模块
const usersRouter = require('./routes/user');

// 创建了服务端实例对象
const app = express();

// 处理动态网页
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
// 处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 解析cookie
app.use(cookieParser());
app.use(session({
  name: 'userId',
  secret: 'COM.it6666.*?', // 用于生成无关紧要的userId的密钥
  cookie: { path:'/', httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  store: new RedisStore({ client: redisClient })
}));

// 处理静态网页
app.use(express.static(path.join(__dirname, 'public')));

// 注册处理路由模块
app.use('/api/user', usersRouter);

// 处理错误
app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
