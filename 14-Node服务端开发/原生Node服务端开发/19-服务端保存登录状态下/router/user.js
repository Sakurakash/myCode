const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {registerUser, loginCheck} = require('../controller/userController');

const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        let result = await loginCheck(req.body);
        if(result.code === 200){
            req.session.username = result.data.username;
            req.session.password = result.data.password;
            req.session.gender = result.data.gender;
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