// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们
/*
在express中, 会在用户编写的中间件和get/post请求之前自动执行一些内置的中间件来给req,res扩展属性和方法
也就是说, 内置的这些中间件会在用户编写的代码之前执行
* */
/*
app.use((req, res, next)=>{
    const url = require('url');
    // 在这里面给请求对象扩展query属性和path属性
    // console.log(req.url); // /test?name=lnj&age=33
    let {pathname, query} =  url.parse(req.url, true);
    // console.log(pathname, query);
    req.query = query;
    req.path = pathname;
    next();
});
 */

app.get('/test', (req, res, next)=>{
    console.log(req.query);
    console.log(req.path);
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});