const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {registerUser, loginCheck} = require('../controller/userController');
/*
1.为什么要存储登录状态?
因为在企业开发中有一些操作是只有登录之后才能操作的
例如: 编辑用户信息, 查看用户订单等
所以我们在登录之后需要存储用户的登录状态,
以后在涉及到一些敏感操作的时候,
我们就可以通过这个状态来判断用户是否已经登录
来决定是否让用户进行相关敏感操作

2.如何存储用户登录状态?
2.1客户端存储 Cookie
2.2服务端存储 Session

3.Cookie特点
- 我们可以在客户端中对cookie进行增删改查, 我们也可以在服务端中对cookie进行增删改查
- 每次发送网络请求, 客户端都会自动将当前域名的cookie发送给服务端
* */
const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        let result = await loginCheck(req.body);
        // 保存登录状态
        if(result.code === 200){
            res.setHeader('Set-Cookie',`username=${req.body.username}; path=/;`)
        }
        return result;
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        // 注册用户
        // 返回注册结果
        return await registerUser(req.body);
    }else if(req.method === 'get' && req.path === USER_INFO){

    }
};

module.exports = userRouterHandle;
