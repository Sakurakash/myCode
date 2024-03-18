// const express = require('express');
const express = require('./nj-express/index'); // createApplication方法

const app = express(); // 执行createApplication方法, 会返回一个对象给我们

app.param('name', (req, res, next, value, key)=>{ // lnj
    // console.log(key, value);
    req.params[key] = 'it666-'+value; // req.params.name = it666-lnj
    next();
});
app.param('name', (req, res, next, value, key)=>{ // lnj
    req.params[key] = 'itzb-'+value; // req.params.name = itzb-lnj
    next();
});
app.param('age', (req, res, next, value, key)=>{ // lnj
    req.params[key] = parseInt(value) + 100;
    next();
});

app.get('/api/:name/:age', (req, res, next)=>{
    // req.params.name = 'it666-' + req.params.name;
    res.end(JSON.stringify(req.params));
});
app.get('/test/:name/:age', (req, res, next)=>{
    // req.params.name = 'it666-' + req.params.name;
    res.end(JSON.stringify(req.params));
});

app.listen(3000, ()=>{
    console.log('listen 3000 ok');
});