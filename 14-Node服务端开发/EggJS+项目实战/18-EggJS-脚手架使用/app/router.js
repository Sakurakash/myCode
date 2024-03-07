'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
/*
1.如何通过EggJS的脚手架来创建Egg项目
1.1在全局安装脚手架工具  npm i egg-init -g
1.2新建一个项目文件夹, 在这个文件夹中执行 npm init egg --type=simple
1.3执行初始化指令之后全程回车(也可以输入内容  项目名称/项目描述/项目作者)
1.4进入项目文件夹, 执行 npm install 安装相关的依赖
1.5可以通过 npm run dev / npm run test / npm run start运行项目
run dev    在开发模式下运行
run test   在调试模式下运行
run start  在上线环境中运行
* */
