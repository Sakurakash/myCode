const {
    USER_LOGIN,
    USER_REGISTER,
    USER_INFO
} = require('./routerConst');
const {registerUser, loginCheck} = require('../controller/userController');
/*
1.客户端存储登录状态的不足
- 存储的登录状态可能不仅仅是存储用户名, 存储什么内容是要根据我们的业务需求来定的
  既然存储的可能不仅仅是用户名, 所以cookie可能会出现存不下的情况(cookie有大小限制)
- 存储在客户端的数据可能会暴露, 所以我们需要对存储的数据进行加密
  但是如果所有数据都加密, 那么我们还需要在服务端存储加密后的映射关系
  否则将来根据加密的数据, 我们也无法得知这是什么内容
- 所以综上所述, 为了提升数据的安全性, 为了能够存储更多的内容
  我们可以在服务端存储登录状态, 我们可以通过Session来存储登录状态

2.如何通过Session来存储登录状态
2.1给每一个用户分配一个无关紧要的值作为为一个标识
2.2在服务端定义一个全局变量为了Session容器
2.3将用户的唯一标识作为key, 用户登录之后就给容器的这个key添加登录状态信息
* */
const userRouterHandle = async (req, res)=>{
    if(req.method === 'post' && req.path === USER_LOGIN){
        // 处理登录
        return await loginCheck(req.body);
    }else if(req.method === 'post' && req.path === USER_REGISTER){
        // 注册用户
        // 返回注册结果
        return await registerUser(req.body);
    }else if(req.method === 'get' && req.path === USER_INFO){

    }
};

module.exports = userRouterHandle;
