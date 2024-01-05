// 1.导入mysql驱动
const mysql      = require('19-服务端保存登录状态下/db/mysql');
const MYSQL_CONFIG = require('../config/db');
// 2.创建连接对象
const connection = mysql.createConnection(MYSQL_CONFIG);
// 3.连接MySQL数据库
connection.connect();
// 4.操作MySQL数据库

const exc = (sql) =>{
    return new Promise((resolve, reject)=>{
        connection.query(sql, function (error, results) {
            if (error){
                reject(error);
            }else{
                resolve(results);
            }
        });
    });
};

module.exports = exc;
