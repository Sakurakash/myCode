/*
1.如何在Node程序中操作MySQL数据库?
我们都知道操作MySQL数据库就是连接MySQL服务器, 给MySQL服务器发送指令
在NodeJS中我们可以借助第三方库来连接MySQL服务器, 给MySQL服务器发送指令
1.1 mysql驱动库
https://www.npmjs.com/package/mysql
npm install mysql
1.2 mysql2驱动库
https://www.npmjs.com/package/mysql2
npm install mysql

 */
// 1.导入MySQL第三方驱动库
const mysql = require('mysql2');

// 2.进行连接配置
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'demo',
    password: 'weiyuhua666'
});

// 4.给MySQL服务器发送指令
connection.query('SELECT * FROM `stu`', (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

// 5.释放连接
connection.end();
