const exc = require('../db/mysql');

async function getUser(username) {
    let sql = `select * from user where username = '${username}'`;
    let results = await exc(sql);
    return results;
}
module.exports = {
    getUser
}