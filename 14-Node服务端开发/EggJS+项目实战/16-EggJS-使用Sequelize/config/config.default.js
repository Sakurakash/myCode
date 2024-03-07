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
    },
    logger : {
        level: 'DEBUG',
    },
    // 全局中间件配置
    /*
    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    // 注意点: 这里的中间件名称就是文件名称
    middleware: [ 'clientCheck' ],
    // 这里的key也是中间件文件的名称
    // 这里的值将来就会传递给中间件的options
    // clientCheck: {
    //     ua: /Chrome/
    },
     */
    // 使用MySQL的配置
    /*
    // 单数据库信息配置
    mysql : {
        // 单数据库信息配置
        client: {
            // host
            host: '127.0.0.1',
            // 端口号
            port: '3306',
            // 用户名
            user: 'root',
            // 密码
            password: 'root',
            // 数据库名
            database: 'demo',
        },
        // 是否加载到 app 上，默认开启
        app: true,
        // 是否加载到 agent 上，默认关闭
        agent: false,
    }
     */
    sequelize : {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'demo',
    }
};