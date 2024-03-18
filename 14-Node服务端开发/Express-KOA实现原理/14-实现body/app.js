// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们

/*
app.use((req, res, next)=>{
    const queryString = require('querystring');
    let params = '';
   req.on('data', (chunk)=>{
       params += chunk;
   }) ;
   req.on('end', ()=>{
       req.body = queryString.parse(params);
       next();
   });
});
 */
app.use(express.urlencoded());
app.post('/test', (req, res, next)=>{
    console.log(req.path);
    console.log(req.body);
});
app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});