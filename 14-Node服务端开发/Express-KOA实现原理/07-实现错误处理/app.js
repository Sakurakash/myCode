// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们
/*
在express中手动触发错误的两种方式
1.给中间件的next方法传递参数
2.给get/post中的next方法传递参数
* */
app.use((req, res, next)=>{
    console.log('中间件1');
    // next('中间件出现了错误');
    next(); // 中间件中的next是用于取出下一个大的一层的, 所以是Router中的next
});
app.use('/test', (req, res, next)=>{
    console.log('中间件2');
    next();
});
app.get('/test/abc', (req, res, next)=>{
    console.log('get 1');
    next('get出现了错误'); // get/post中的next是用于取出下一个小的一层的, 所以是Route中的next
    // next();
},(req, res, next)=>{
    res.end('www.it666.com');
});
app.post('/test/abc', (req, res, next)=>{
    res.end('www.itzb.com');
});

app.use((err, req, res, next)=>{
    console.log(err, '-------');
});
app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});