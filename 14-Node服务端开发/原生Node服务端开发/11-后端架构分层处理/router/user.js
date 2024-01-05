const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {
    SuccessModel,
    ErrorModel
} = require('../model/ResultModel');
const {userValidate, userExists} = require('../controller/userController');

const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        return new SuccessModel('登录成功', {name:'lnj', age: 33});
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        // 1.校验数据是否正确
        let valid = userValidate(req.body);
        // 2.判断当前注册的用户是否存储
        let isExists = await userExists(req.body.username);
        // 3.判断是否可以注册
        if(valid && !isExists){
            console.log('可以注册');
        }else{
            console.log('不可以注册');
        }
        // 处理注册
        return new ErrorModel('注册失败',{})
    }else if(req.method === 'get' && req.path === USER_INFO){
        // 处理获取用户信息
        return new SuccessModel('获取用户信息成功', {name:'lnj', age: 33})
    }else {
        return false
    }
};

module.exports = userRouterHandle;
