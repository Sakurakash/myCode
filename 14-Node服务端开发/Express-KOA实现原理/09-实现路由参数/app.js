// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们

/*
/api?name=lnj&age=33;
/api/lnj/33
* */
app.get('/api/:name/:age', (req, res, next)=>{
    // console.log(req.params);
    res.end(JSON.stringify(req.params));
});
app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});