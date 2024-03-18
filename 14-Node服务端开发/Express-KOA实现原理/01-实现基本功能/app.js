// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们
/*
1.express本质是什么?
就是对原生NodeJS的http模块进行封装
2.express是如何匹配路由的?
会按照我们书写的顺序从上至下的匹配, 哪个匹配就执行哪个后面的回调函数
3.express如果没有匹配到对应的路由会干什么?
会返回 Cannot 请求方法 请求地址
* */
app.get('/', (req, res)=>{
    res.end('www.it666.com');
});
app.get('/test', (req, res)=>{
    res.end('www.itzb.com');
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});