let http = require("http");
let querystring = require("querystring");
/*
1.如何拿到POST请求传递过来的参数
使用querystring模块

querystring.parse(str[, sep[, eq[, options]]])  将参数转换为对象
querystring.stringify(obj[, sep[, eq[, options]]]) 将对象转换为参数
*/
http.createServer(function (req, res) {
    let params = "";
    req.on("data", function (chunk) {
        params += chunk;
        console.log("成功");
    });
    req.on("end", function () {
        let obj = querystring.parse(params);
        console.log(obj);
        res.end(obj.username + "---" + obj.password);
    });
}).listen(3000);