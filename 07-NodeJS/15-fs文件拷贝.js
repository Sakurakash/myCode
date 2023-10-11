let fs = require("fs");
let path = require("path");
let str = path.join(__dirname, "data.txt");
let str2 = path.join(__dirname, "data2.txt");

let readStream = fs.createReadStream(str, {encoding: "utf-8"});
let writeStream = fs.createWriteStream(str2);

/*
readStream.on("open", function () {
    console.log("成功建立关系");
});
readStream.on("error", function () {
    console.log("建立关系失败");
});
readStream.on("data", function (data) {
    console.log("成功读取文件");
    writeStream.write(data);
});
readStream.on("close", function () {
    console.log("读取完毕");
    writeStream.end();
    console.log("拷贝完毕");
});*/
readStream.pipe(writeStream);
