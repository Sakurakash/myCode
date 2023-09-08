/*
1.路径的格式化处理
// path.parse()  string->obj
// path.format() obj->string

2.拼接路径
path.join([...paths])

3.规范化路径
path.normalize(path)

4.计算相对路径
path.relative(from, to)

5.解析路径
path.resolve([...paths])
*/

let path = require("path");
let obj = path.parse("a/b/c/d/index.html");
// console.log(obj);
//运行结果:
/*{
    root: '',
        dir: 'a/b/c/d',
    base: 'index.html',
    ext: '.html',
    name: 'index'
}*/

let obj1 =  {
    root: '',
    dir: 'a/b/c/d',
    base: 'index.html',
    ext: '.html',
    name: 'index'
};
let str = path.format(obj1);
// console.log(str);// a/b/c/d\index.html

/*let res = path.join("a/b/c", "d");// a\b\c\d
console.log(res);
let res1 = path.join("a/b/c", "/d");// a\b\c\d
console.log(res1);
let res2 = path.join("a/b/c", "d/e", "..");// a\b\c\d
console.log(res2);
let res3 = path.join("a/b/c", "d/e", "..", "..");// a\b\c
console.log(res3);*/

// let res = path.normalize("a/b/c//d///e\\/");
// console.log(res); // a\b\c\d\e\

// let res = path.relative("a/b/c/d", "a/b/e/f");
// console.log(res); //..\..\e\f

let res = path.resolve("/a/b/c/d", "../../e/f");
console.log(res); // \a\b\e\f


