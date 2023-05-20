import P from "./a.js";// 获取export default的导出值(名称可以不同);
let p = new P();
console.log(p);
import {name, age} from "./a.js";// 获取export导出的对象(名称必须相同);
// import {name as str} from "./a.js";// 可通过as修改接收到的变量名称, 修改后原变量名称会失效;
console.log(name, age);
// console.log(str);