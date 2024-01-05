let http = require("http");
/*
1.什么是HTTP模块
通过Nodejs提供的http模块，我们可以快速的构建一个web服务器,
也就是快速实现过去PHP服务器的功能(接收浏览器请求、响应浏览器请求等)

2.通过HTTP模块实现服务器功能步骤
2.1导入HTTP模块
2.2创建服务器实例对象
2.3绑定请求事件
2.4监听指定端口请求
*/

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
