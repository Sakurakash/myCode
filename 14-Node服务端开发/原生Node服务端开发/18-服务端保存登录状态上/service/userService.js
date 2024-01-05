const exc = require('../db/mysql');

/**
 * 根据用户名获取用户信息你
 * @param username 被获取的用户名
 * @param password
 * @returns {Promise<*>}
 */
async function getUser(username, password) {
    if(password){
        let sql = `select * from user where username = '${username}' and password = '${password}'`;
        return await exc(sql);
    }else{
        let sql = `select * from user where username = '${username}'`;
        return await exc(sql);
    }
}
async function createUser({username, password, gender}){
    let sql = `insert into user (username, password, gender) values('${username}','${password}','${gender}');`;
    return await exc(sql);
}
module.exports = {
    getUser,
    createUser
}
