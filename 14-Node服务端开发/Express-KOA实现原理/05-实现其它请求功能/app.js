// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们

app.get('/', (req, res, next)=>{
    console.log('1');
    next();
},(req, res, next)=>{
    console.log('2');
    next();
},(req, res, next)=>{
    console.log('3');
    next();
});
app.get('/', (req, res)=>{
    console.log('4');
    res.end('www.itzb.com');
});

app.post('/', (req, res, next)=>{
    console.log('post 1');
    next();
},(req, res, next)=>{
    console.log('post 2');
    next();
},(req, res, next)=>{
    console.log('post 3');
    next();
});
app.post('/', (req, res)=>{
    console.log('post 4');
    res.end('www.it666.com');
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});