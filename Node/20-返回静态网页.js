let http = require("http");
let path = require("path");
let fs = require("fs");

http.createServer(function (req, res) {
   readFile(req, res);
}).listen(2000);
function readFile(req, res) {
   let pathFile = path.join(__dirname, "www", req.url);
   fs.readFile(pathFile, function (err, content) {
      if (err){
         res.end("读取错误");
      }else {
         res.end(content);
      }
   });
}