let http = require("http");
http.createServer(function (req, res) {
   res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
   });
   console.log(req.url);
   // req是http.IncomingMessage类的实例
   // res是http.ServerResponse类的实例
   if (req.url.startsWith("/index")){
      /*res.end("首页1");
      res.end("首页2");//end方法不能多次返回数据,只有第一次有效*/
      res.write("首页1");
      res.write("首页2");
      res.end();//write方法可以多次返回数据,但不会主动结束本次请求,需要使用手动使用end方法来结束
   }else if (req.url.startsWith("/login")){
      res.end("登录界面");
   }else {
      res.end("没有数据");
   }
}).listen(2000);