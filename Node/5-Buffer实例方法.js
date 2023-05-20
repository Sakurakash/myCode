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
