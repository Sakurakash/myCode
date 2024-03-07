const express = require('express');
const router = express.Router();
// 会将注册的地址和当前的地址拼接在一起来匹配
// /api/user/login
router.get('/login', (req, res, next)=>{
    // 注意点: 响应对象的json方法是express给响应对象扩展的
    //         这个方法会自动将对象转换成字符串之后返回
    //         这个方法还会自动帮助我们设置响应头
    res.json({
        name:'lnj',
        age:33,
        method: 'get'
    });
});
router.post('/register', (req, res, next)=>{
    res.json({
        name:'lnj',
        age:33,
        method: 'post'
    });
});
module.exports = router;