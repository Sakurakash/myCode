// const express = require('express');
// const user = require('./router/userRouter');
// const goods = require('./router/goodsRouter');
const express = require('./nj-express/index'); // createApplication方法

const user = express.Router();

const app = express(); // 执行createApplication方法, 会返回一个对象给我们

// /user/login
user.get('/login', (req, res, next)=>{
    res.end('user login');
});
// /user/register
user.get('/register', (req, res, next)=>{
    res.end('user register');
});
app.use('/user', user);
// app.use('/user', (req, res, next)=>{
// });

// app.use('/user', goods);
app.get('/test', (req, res, next)=>{
    res.end('test');
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});