/*
1.将二进制数据转换成字符串
返回: <string> 转换后的字符串数据。
buf.toString();

2.往Buffer中写入数据
string <string> 要写入 buf 的字符串。
offset <integer> 开始写入 string 之前要跳过的字节数。默认值: 0。
length <integer> 要写入的字节数。默认值: buf.length - offset。
encoding <string> string 的字符编码。默认值: 'utf8'。
返回: <integer> 已写入的字节数。
buf.write(string[, offset[, length]][, encoding])

3.从指定位置截取新Buffer
start <integer> 新 Buffer 开始的位置。默认值: 0。
end <integer> 新 Buffer 结束的位置（不包含）
buf.slice([start[, end]])
*/

/*let buf = Buffer.from([97, 98, 99]);
let res = buf.toString();*/

/*let buf = Buffer.alloc(5);
console.log(buf);
// buf.write("abcdefg");
// buf.write("abcdefg", 2);//offset: 从第几位开始写入
buf.write("abcdefg", 2, 1);//length: 写入几位
console.log(buf);
console.log(buf.toString());*/

let buf = Buffer.from("abcdefg");
console.log(buf);
let buf1 = buf.slice(2, 4);// 已弃用，改用subarray
// let buf1 = buf.subarray(2, 4);
console.log(buf1);
console.log(buf1.toString());
