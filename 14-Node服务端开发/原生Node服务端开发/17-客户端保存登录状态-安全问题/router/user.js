const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {registerUser, loginCheck} = require('../controller/userController');
const generatePwd = require('../utils/crypto');

const getCookieExpires = () =>{
    let date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
    return date.toGMTString();
}
const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        let result = await loginCheck(req.body);
        // 保存登录状态
        if(result.code === 200){
            /*
            注意点: 由于Cookie既可以在服务端修改, 又可以在客户端修改, 所以存在安全隐患
                    所以我们在服务端设置Cookie的时候, 可以通过httpOnly来指定只能在服务端修改
                    不能在客户端修改
            注意点: 虽然我们通过服务端保存了登录状态, 但是并没有给登录状态设置过期时间,
                    所以还是存在安全隐患, 所以我们在保存登录状态的时候, 还需要设置过期时间
            注意点: 在客户端保存用户的用户名明文其实也是不安全的, 所以在在保存登录状态的时候
                    应该加密之后再保存
            * */
            res.setHeader('Set-Cookie',`username=${generatePwd(req.body.username)}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
        return result;
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        // 注册用户
        let result = await registerUser(req.body);
        // 返回注册结果
        return result;
    }else if(req.method === 'get' && req.path === USER_INFO){

    }
};

module.exports = userRouterHandle;