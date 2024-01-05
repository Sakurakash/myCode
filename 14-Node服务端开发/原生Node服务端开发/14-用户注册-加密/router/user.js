const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {
    SuccessModel,
    ErrorModel
} = require('../model/resultModel');
const {registerUser} = require('../controller/userController');

const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        return new SuccessModel('登录成功', {name:'lnj', age: 33});
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        // 注册用户
        // 返回注册结果
        return await registerUser(req.body);
    }else if(req.method === 'get' && req.path === USER_INFO){
        // 处理获取用户信息
        return new SuccessModel('获取用户信息成功', {name:'lnj', age: 33})
    }
};

module.exports = userRouterHandle;
