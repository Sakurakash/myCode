let path = require("path");
let fs = require("fs");
let str = path.join(__dirname, "data.txt");
let buf = Buffer.from("被写入的数据(由buffer传入)");
/*fs.writeFile(str, "被写入的数据", "utf-8", function (err) {
    if (err){
        throw new Error("写入数据失败");
    }else {
        console.log("写入数据成功");
    }
});*/
let res = fs.writeFileSync(str, "被写入的数据(同步)");
console.log(res);