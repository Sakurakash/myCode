// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们

app.get('/', (req, res)=>{
    res.end('www.it666.com');
});
app.get('/test', (req, res)=>{
    res.end('www.itzb.com');
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});