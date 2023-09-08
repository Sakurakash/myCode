let fs = require("fs");
let path = require("path");
let str = path.join(__dirname, "创建的目录");
/*
1、创建目录
fs.mkdir(path[, mode], callback)
fs.mkdirSync(path[, mode])

2、读取目录
fs.readdir(path[, options], callback)
fs.readdirSync(path[, options])

3、删除目录
fs.rmdir(path, callback)
fs.rmdirSync(path)
*/
//创建目录
/*fs.mkdir(str, function (err) {
    if (err){
        throw new Error("目录创建错误");
    }else {
        console.log("目录创建成功");
    }
});*/
//删除目录
/*fs.rmdir(str, function (err) {
    if (err){
        throw new Error("目录删除错误");
    }else {
        console.log("目录删除成功");
    }
});*/
//读取目录
fs.readdir(__dirname, function (err, files) {
    if (err){
        throw new Error("目录读取错误");
    }else {
        console.log("目录读取成功", files);
    }
});