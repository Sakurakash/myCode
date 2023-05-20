let fs = require("fs");
let path = require("path");
let str = path.join(__dirname, "data.txt");

let readStream = fs.createReadStream(str, {encoding: "utf-8", highWaterMark: 6});

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