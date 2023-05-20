const path = require("path");
const fs = require("fs");
const vm = require("vm");
class hModule {
    constructor(id) {
        this.id = id;
        this.exports = {};
    }
}
hModule._cache = {};
hModule._extensions = {
    ".js": function (module) {
        let script = fs.readFileSync(module.id, 'utf8');
        let strScript = hModule.wrapper[0] + script + hModule.wrapper[1];
        let jsScript = vm.runInThisContext(strScript);
        jsScript.call(module.exports, module.exports, null, module);
    },
    ".json": function (module) {
        let json = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(json);
    }
};
hModule.wrapper = [
    '(function (exports, require, module, __filename, __dirname) { ',
    '\n});'
];
function hRequire(filePath) {
    // 将传入的相对路径转化为绝对路径;
    let absPath = path.join(__dirname, filePath);
    let cacheModule = hModule._cache[absPath];
    // 从缓存中读入module对象;
    if (cacheModule){
        return cacheModule.exports;
    }
    // 如没有缓存就自己创建一个hModule对象,并缓存起来;
    let module = new hModule(absPath);
    hModule._cache[absPath] = module;
    // 读入module;
    tryModuleLoad(module);
    // 返回module的exports;
    return module.exports;
}
function tryModuleLoad(module) {
    let extName = path.extname(module.id);
    hModule._extensions[extName](module);
}
// let person = hRequire("./person.json");
let person = hRequire("./2-自定义模块-a.js");
// console.log(person);
console.log(person.num);