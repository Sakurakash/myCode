// 导入了一些第三方的模块
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
require('./db/sync');
/*
1.在原生的NodeJS中如何存储登录状态
1.1通过全局变量存储
1.2通过Redis存储

2.在原生的NodeJS中如何通过全局变量存储
2.1首先要生成一个无关紧要的userId
2.2然后将这个无关紧要的userId通过cookie存储在客户端中
2.2然后将这个userId作为key, 将登录后的数据作为值, 存储到全局变量中

3.在express中如何通过全局变量存储
使用express-session这个库, 就能够自动帮我们完事原生NodeJS中我们实现的所有代码
* */
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
// 注册保存登录状态的中间件
app.use(session({
  name: 'userId',
  secret: 'COM.it666.*?', // 用于生成无关紧要的userId的
  cookie: { path:'/', httpOnly:true, maxAge: 24 * 60 * 60 * 1000 }
}));

/*
1. name - cookie的名字（原属性名为 key）。（默认：’connect.sid’）
2. store - session存储实例
3. secret - 用它来对session cookie签名，防止篡改
4. cookie - session cookie设置 （默认：{ path: ‘/‘, httpOnly: true,secure: false, maxAge: null }）
5. genid - 生成新session ID的函数 （默认使用uid2库）
6. rolling - 在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
7. resave - 强制保存session即使它并没有变化 （默认： true, 建议设为：false）
8. proxy - 当设置了secure cookies（通过”x-forwarded-proto” header ）时信任反向代理。当设定为true时，
”x-forwarded-proto” header 将被使用。当设定为false时，所有headers将被忽略。当该属性没有被设定时，将使用Express的trust proxy。
9. saveUninitialized - 强制将未初始化的session存储。当新建了一个session且未设定属性或值时，它就处于未初始化状态。在设定一个cookie前，这对于登陆验证，减轻服务端存储压力，权限控制是有帮助的。（默认：true）
10. unset - 控制req.session是否取消（例如通过 delete，或者将它的值设置为null）。这可以使session保持存储状态但忽略修改或删除的请求（默认：keep）
* */
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
