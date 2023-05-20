let http = require("http");
let querystring = require("querystring");

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