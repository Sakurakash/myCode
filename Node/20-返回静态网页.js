let http = require("http");
let path = require("path");
let fs = require("fs");
/*
1.响应完整页面
拿到用户请求路径之后, 只需要利用fs模块将对应的网页返回即可
*/

http.createServer(function (req, res) {
   readFile(req, res);
}).listen(2000);
function readFile(req, res) {
   let pathFile = path.join(__dirname, "www", req.url);
   fs.readFile(pathFile, function (err, content) {
      if (err){
         res.end("Server Error");
      }else {
         res.end(content);
      }
   });
}