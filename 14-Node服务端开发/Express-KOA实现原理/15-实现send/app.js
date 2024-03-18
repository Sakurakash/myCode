// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们
/*
app.use((req, res, next)=>{
    res.send = function (value) {
        if(typeof value === 'string'){
            res.end(value);
        }else if(typeof value === 'object'){
            res.end(JSON.stringify(value));
        }
    }
    next();
});
*/

app.get('/test', (req, res, next)=>{
    // res.send('www.it666.com');
    res.send({
        name:'lnj',
        age:33
    });
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});