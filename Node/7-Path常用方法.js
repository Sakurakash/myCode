let path = require("path");
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