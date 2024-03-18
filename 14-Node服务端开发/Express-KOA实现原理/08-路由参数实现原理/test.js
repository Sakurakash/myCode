/*
let path = '/api/:name/:age';
let reg = new RegExp(/\/api\/:([^\/]+)\/:([^\/]+)/);
// let res = path.match(reg);
// console.log(res);
let [,...keys] = path.match(reg);
console.log(keys);

let url = '/api/lnj/33';
reg = new RegExp(/\/api\/([^\/]+)\/([^\/]+)/);
let [, ...values] = url.match(reg);
console.log(values);
// { name: 'lnj', age: '33' }
 */

// 根据注册的路由地址 '/api/:name/:age'
// 生成对应的正则表达式 '/\/api\/([^\/]+)\/([^\/]+)/'
let path = '/api/:name/:age/:gender';
let keys = [];
// 注意点: replace方法会先根据第一个参数找到匹配的内容, 然后再利用回调函数中的返回值替换匹配的内容
let res = path.replace(/:([^\/]+)/g, function () {
    // console.log(arguments);
    keys.push(arguments[1]);
    return '([^\\/]+)'
});
console.log(keys);
// 根据生成的正则表达式提取请求地址中的value
let url = '/api/lnj/33/man';
let reg = new RegExp(res);
let [, ...values] = url.match(reg);
console.log(values);
