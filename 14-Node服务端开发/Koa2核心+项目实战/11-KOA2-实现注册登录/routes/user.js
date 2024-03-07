const router = require('koa-router')()
const {registerUser, loginCheck} = require('../controller/userController');

router.prefix('/api/user')
router.post('/login',async (ctx, next)=>{
    // 处理登录
    let result = await loginCheck(ctx.request.body);
    // 存储登录状态
    // if(result.code === 200){
    //     req.session.username = result.data.username;
    //     req.session.password = result.data.password;
    //     req.session.gender = result.data.gender;
    //     // 同步到Redis中
    //     redisSet(req.userId, req.session);
    // }
    return ctx.body = result;
});
router.post('/register',async (ctx, next)=>{
    // 注册用户
    let result = await registerUser(ctx.request.body);
    // 返回注册结果
    return ctx.body = result;
});

module.exports = router;