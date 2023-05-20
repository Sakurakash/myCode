let vm = require("vm");
/*let name = "lnj";
vm.runInThisContext("console.log(name)"); //name is not defined*/

// vm.runInThisContext提供了一个安全的代码执行环境,但仍旧能访问到global中的数据;
/*global.name = "lnj";
vm.runInThisContext("console.log(name)"); //lnj*/

// vm.runInNewContext提供了一个安全的代码执行环境,无法访问到global中的数据;
global.name = "lnj";
vm.runInNewContext("console.log(name)"); //name is not defined

