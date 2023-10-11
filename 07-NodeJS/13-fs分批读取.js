/*
1.大文件操作
前面讲解的文件写入和读取操作都是一次性将数据读入内存或者一次性写入到文件中
但是如果数据比较大, 直接将所有数据都读到内存中会导致计算机内存爆炸,卡顿,死机等
所以对于比较大的文件我们需要分批读取和写入

fs.createReadStream(path[, options])
fs.createWriteStream(path[, options])
*/
let fs = require("fs");
let path = require("path");
let str = path.join(__dirname, "data.txt");

let readStream = fs.createReadStream(str, {encoding : "utf8", highWaterMark : 1});

readStream.on("open", function () {
    console.log("成功建立关系");
});
readStream.on("error", function () {
    console.log("建立关系失败");
});
readStream.on("data", function (data) {
    console.log("成功读取文件", data);
});
readStream.on("close", function () {
    console.log("读取完毕");
});