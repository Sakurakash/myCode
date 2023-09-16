#! /usr/bin/env node
// process.cwd()作用: 获取当前执行指令的工作路径
// console.log(process.cwd());// F:\myCode\webpack\手写webpack

const path = require("path");
const Compiler = require("../lib/Complier.js");

const configPath = path.resolve(process.cwd(), "webpack.config.js");
const config = require(configPath);
const cp = new Compiler(config);
cp.hooks.entryOption.call();
cp.run();
