let MYSQL_CONFIG;

if(process.env.NODE_ENV === 'dev'){
    MYSQL_CONFIG = {
        host     : '127.0.0.1',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'demo'
    }
}else if(process.env.NODE_ENV === 'pro'){
    MYSQL_CONFIG = {
        host     : '127.0.0.1',
        port     : '3306',
        user     : 'root',
        password : 'root',
        database : 'demo'
    }
}
module.exports = MYSQL_CONFIG;