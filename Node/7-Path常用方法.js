let path = require("path");
/*
1.路径模块(path)
封装了各种路径相关的操作
和Buffer一样,NodeJS中的路径也是一个特殊的模块
不同的是Buffer模块已经添加到Global上了, 所以不需要手动导入
而Path模块没有添加到Global上, 所以使用时需要手动导入

2.获取路径的最后一部分
path.basename(path[, ext])

3.获取路径
path.dirname(path)

4.获取扩展名称
path.extname(path)

5.判断是否是绝对路径
path.isAbsolute(path)

6.获取当前操作系统路径分隔符
path.delimiter  （windows是\ Linux是/）

7.获取当前路径环境变量分隔符
path.sep  (windows中使用; linux中使用:)
* */
// let res1 = path.basename("a/b/c/d/index.html");
// console.log(res1); // index.html
// let res2 = path.basename("a/b/c/d/");
// console.log(res2); // d
// let res3 = path.basename("a/b/c/d/index.html", ".html");
// console.log(res3); // index

// let res1 = path.dirname("a/b/c/d/index.html");
// console.log(res1); // a/b/c/d
// let res2 = path.dirname("a/b/c/d");
// console.log(res2); // a/b/c

// let res1 = path.extname("a/b/c/d/index.html");
// console.log(res1); // .html
// let res2 = path.extname("a/b/c/d");
// console.log(res2); // 空

// let res1 = path.isAbsolute("a/b/c/d/index.html");
// console.log(res1); // false
// let res2 = path.isAbsolute("c:\\a\\b\\c\\d");
// console.log(res2); // true
// let res3 = path.isAbsolute("/a/b/c/d/index.html");
// console.log(res3); // true

let res1 = path.sep;
console.log(res1); // Linux为"/" , Windows为"\"
let res2 = path.delimiter;
console.log(res2); // Linux为":" , Windows为";"