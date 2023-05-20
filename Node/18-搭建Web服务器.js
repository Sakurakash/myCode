let http = require("http");

/*let server = http.createServer();
server.on("request", function (req, res) {
   // res.end("data");
   res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
   });
   res.end("中文数据");
});
server.listen(2000);*/

// 链式编程简写:
http.createServer(function (req, res) {
   // res.end("data");
   // res.writeHead方法告诉浏览器返回的数据是什么类型的
   res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
   });
   res.end("中文数据");
}).listen(2000);