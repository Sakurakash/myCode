/*
1.检查是否支持某种编码格式
Buffer.isEncoding(encoding)

2.检查是否是Buffer类型对象
Buffer.isBuffer(obj)

3.获取Buffer实际字节长度
Buffer.byteLength(string[, encoding])
注意点: 一个汉字占用三个字节

4.合并Buffer中的数据
Buffer.concat(list[, totalLength])
*/

// let res = Buffer.isEncoding("utf-8");
// let res = Buffer.isEncoding("gbk");

// let obj = {};
// let buf = Buffer.alloc(5);
// // let res = Buffer.isBuffer(obj);
// let res = Buffer.isBuffer(buf);

// // let buf = Buffer.from("123");
// let buf = Buffer.from("一二三");
// let res = Buffer.byteLength(buf);
// console.log(res);
// console.log(buf.length);

let buf1 = Buffer.from("123");
let buf2 = Buffer.from("abc");
let buf3 = Buffer.from("xxx");
let res = Buffer.concat([buf1, buf3, buf2]);
console.log(res.toString());



