let http = require("http");
let path = require("path");
let fs = require("fs");
let url = require("url");
let querystring = require("querystring");
let template = require('art-template');

let people = {
    "张三": {name: "张三", age: "23", gender: "男"},
    "李四": {name: "李四", age: "32", gender: "女"},
    "王五": {name: "王五", age: "41", gender: "沃尔玛购物袋"}
};
http.createServer(function (req, res) {
    let obj = url.parse(req.url);
    if (obj.pathname.startsWith("/index") && req.method.toLowerCase() === "get"){
        readFile(obj.pathname, res);
    }else if(obj.pathname.startsWith("/info") && req.method.toLowerCase() === "post"){
        let pathFile = path.join(__dirname, obj.pathname);
        let params = "";
        req.on("data", function (chunk) {
            params += chunk;
        });
        /*fs.readFile(pathFile, "utf-8", function (err, content) {
            if (err){
                res.end("读取错误");
            }else {
                req.on("end", function () {
                    let obj = querystring.parse(params);
                    let value = people[obj.userName];
                    let newContent = content.replace("!!!name!!!", value.name)
                    .replace("!!!age!!!", value.age)
                    .replace("!!!gender!!!", value.gender);
                    res.end(newContent);
                });
            }
        });*/
        req.on("end", function () {
            let obj = querystring.parse(params);
            let value = people[obj.userName];
            let html = template(pathFile, value);
            res.end(html);
        });
    }
}).listen(2000);

function readFile(pathname, res) {
    let pathFile = path.join(__dirname, pathname);
    fs.readFile(pathFile, function (err, content) {
        if (err){
            res.end("读取错误");
        }else {
            res.end(content);
        }
    });
}