/*
0.准备知识
0.1计算机只能识别0和1(因为计算机只认识通电和断电两种状态),
    0.2所有存储在计算机上的数据都是0和1组成的(数据越大0和1就越多)
0.3计算机中的度量单位
1 B(Byte字节) = 8 bit(位)
// 00000000  就是一个字节
// 111111111 也是一个字节
// 10101010  也是一个字节
// 任意8个 0或1的组合都是一个字节
1 KB = 1024 B
1 MB = 1024KB
1 GB = 1024MB

1.什么是Buffer?
    Buffer是NodeJS全局对象上的一个类, 是一个专门用于存储字节数据的类
NodeJS提供了操作计算机底层API, 而计算机底层只能识别0和1,
    所以就提供了一个专门用于存储字节数据的类

2.如何创建一个Buffer对象
2.1创建一个指定大小的Buffer
Buffer.alloc(size[, fill[, encoding]])

2.2根据数组/字符串创建一个Buffer对象
Buffer.from(string[, encoding])

3.Buffer对象本质
本质就是一个数组
*/

// let buf = Buffer.alloc(5, 10);
// console.log(buf);

let buf = Buffer.from([17, 31, 52]);
// let buf = Buffer.from("abc");
let oBuf = buf[0];
console.log(buf);
console.dir(buf);
console.log(oBuf);