const Ajv = require('ajv');
const ajv = new Ajv();
const userSchema = require('../validator/userValidator');
const {getUser} = require('../service/userService');
const {SuccessModel, ErrorModel} = require('../model/ResultModel');
const {userDataFail, userExistsFail} = require('../config/errorConst');

/**
 * 校验用户数据是否正确
 * @param data 被校验的数据
 * @returns {boolean | PromiseLike<any>}
 */
function userValidate(data) {
    return ajv.validate(userSchema, data);
}

/**
 * 检查用户是否存在
 * @param username 被检查的用户名称
 * @returns {Promise<boolean>}
 */
async function userExists(username){
    let users = await getUser(username);
    return users.length !== 0;
}

async function registerUser(data){
// 1.校验数据是否正确
    let valid = userValidate(data);
    if(!valid){
        return new ErrorModel(userDataFail);
    }
    // 2.判断当前注册的用户是否存储
    let isExists = await userExists(data.username);
    // 3.判断是否可以注册
    if(valid && !isExists){
        console.log('可以注册');
    }else{
        return new ErrorModel(userExistsFail);
    }
}

module.exports = {
    userValidate,
    userExists,
    registerUser
}