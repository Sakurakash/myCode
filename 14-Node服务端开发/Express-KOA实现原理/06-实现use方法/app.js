// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们
/*
use方法特点
可以接收一个参数, 也可以接收两个参数
如果只传递了一个参数, 那么无论路由地址是否匹配, 无论是get/post都会执行
如果传递了两个参数, 那么会先匹配路由地址, 路由地址匹配, 无论是get/post都会执行
并且use方法在匹配路由地址的时候采用的是和cookie一样的前缀匹配的方式
当前请求的路由地址是: /test/abc
当前use方法监听的地址是: /test
当前请求的路由地址是: /test/abc
当前use方法监听的地址是: /
* */
app.use((req, res, next)=>{
    console.log('中间件1');
    next();
});
app.use('/test', (req, res, next)=>{
    console.log('中间件2');
    next();
});
app.get('/test/abc', (req, res, next)=>{
    res.end('www.it666.com');
});
app.post('/test/abc', (req, res, next)=>{
    res.end('www.itzb.com');
});
app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});