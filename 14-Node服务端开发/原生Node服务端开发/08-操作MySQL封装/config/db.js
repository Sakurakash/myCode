let MYSQL_CONFIG = {
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : 'weiyuhua666',
    database : 'demo'
};
if(process.env.NODE_ENV === 'pro'){
    MYSQL_CONFIG = {
        host     : '127.0.0.1',
        port     : '3306',
        user     : 'root',
        password : 'weiyuhua666',
        database : 'demo'
    }
}
module.exports = MYSQL_CONFIG;
