let http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain; charset=utf-8"
    });
    if (req.method.toLowerCase() === "get"){
        console.log("get方法");
        res.end("get方法");
    }else if (req.method.toLowerCase() === "post"){
        console.log("post方法");
        res.end("post方法");
    }
}).listen(3000);