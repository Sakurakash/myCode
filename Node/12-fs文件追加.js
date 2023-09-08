/*
1.追加写入
fs.appendFile(path, data[, options], callback)
fs.appendFileSync(path, data[, options])
*/
let path = require("path");
let fs = require("fs");
let str = path.join(__dirname, "data.txt");
let buf = Buffer.from(" -- 被追加的数据(由buffer传入) -- ");
// fs.appendFile(str, " -- 被追加的数据 -- ", "utf-8", function (err) {
/*fs.appendFile(str, buf, "utf-8", function (err) {
    if (err){
        throw new Error("追加数据失败");
    }else {
        console.log("追加数据成功");
    }
});*/
fs.appendFileSync(str, " -- 被追加的数据(同步) -- ");