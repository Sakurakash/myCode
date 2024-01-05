const exc = require('../db/mysql');

/**
 * 根据用户名获取用户信息你
 * @param username 被获取的用户名
 * @returns {Promise<*>}
 */
async function getUser(username) {
    let sql = `select * from user where username = '${username}'`;
    return await exc(sql);
}
module.exports = {
    getUser
}
