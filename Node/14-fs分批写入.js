let fs = require("fs");
let path = require("path");
let str = path.join(__dirname, "data.txt");

let writeStream = fs.createWriteStream(str);

writeStream.on("open", function () {
    console.log("成功建立关系");
});
writeStream.on("error", function () {
    console.log("建立关系失败");
});
writeStream.on("close", function () {
    console.log("写入完毕");
});
let data = "被分批写入的数据";
let index = 0;
let timerId = setInterval(function () {
    let ch = data[index];
    writeStream.write(ch);
    index++;
    console.log("本次写入了", ch, typeof ch);
    if (index === data.length){
        clearInterval(timerId);
        writeStream.end();
    }
}, 100);
writeStream.write(data);
