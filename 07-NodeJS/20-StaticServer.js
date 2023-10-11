let path = require("path");
let fs = require("fs");
let mime = require("./mime.json");
/*
1.响应静态资源
在给浏览器返回数据的时候,
如果没有指定响应头的信息,
如果没有设置返回数据的类型,
那么浏览器不一定能正确的解析

所以无论返回什么类型的静态资源都需要添加对应的响应头信息
*/
function readFile(req, res, rootPath) {
    let filePath = path.join(rootPath, req.url);
    /*
    注意点:
    1.加载其它的资源不能写utf8
    2.如果服务器在响应数据的时候没有指定响应头, 那么在有的浏览器上, 响应的数据有可能无法显示
    */
    let extName = path.extname(filePath);
    let type = mime[extName];
    if(type.startsWith("text")){
        type += "; charset=utf-8;";
    }
    res.writeHead(200, {
        "Content-Type": type
    });
    fs.readFile(filePath, function (err, content) {
        if(err){
            res.end("Server Error");
        }
        res.end(content);
    });
}

exports.StaticServer = readFile;