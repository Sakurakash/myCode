/*
1.文件读取
fs.readFile(path[, options], callback)
fs.readFileSync(path[, options])

注意点:
没有指定第二个参数, 默认会将读取到的数据放到Buffer中
第二个参数指定为utf8, 返回的数据就是字符串
*/

let path = require("path");
let fs = require("fs");
let str = path.join(__dirname, "data.txt");
fs.readFile(str, "utf-8", function (err, data) {
    if (err){
        console.log("文件获取错误");
    }else {
        // console.log(data.toString());
        // console.log(Buffer.isBuffer(data));
        // console.log(data);
    }
});
// readFileSync是同步的, readFile是异步的;
let data = fs.readFileSync(str, "utf-8");
console.log(data);