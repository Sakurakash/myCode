// exports.keys = 'COM.it666.*?'; // 用于生成客户端中保存的userId
module.exports = {
    keys: 'COM.it666.*?',
    security: {
        csrf: {
            ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
        },
    },
    view:{
        mapping:{
            '.html':'ejs'
        }
    }
};