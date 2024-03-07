'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/test', controller.user.test);
  /*
  1.什么是单元测试?
  单元测试是指对软件中的最小可测试单元进行检查和验证
  2.什么是最小可测试单元?
  一个函数, 一个类, 一个文件, 这些都可以称之为最小可测试单元
  具体需要根据实际情况去判定其具体含义, 一般情况下我们以函数作为最小单元即可
  3.单元测试有什么用?
  保证代码的正确性
  保存程序的稳定性
  增强自信心
  公司领导要求(红绿灯)

  4.在EggJS中如何进行单元测试
  4.1EggJS使用Mocha测试框架和power-assert断言库来进行单元测试
  Mocha:        https://mochajs.org/
  作用 : 提供了编写测试代码的方法
  power-assert: https://github.com/power-assert-js/power-assert
  作用 : 判断测试结果是否正确

  4.2EggJS还抽取了一个叫做egg-mock的辅助模块, 配合Mocha和power-assert进行测试
  egg-mock:     https://www.npmjs.com/package/egg-mock
  作用 : 帮助我们能够在单元测试中模拟app, context, cookie, session, 网络请求等

  4.3EggJS规定了测试文件的存放路径和文件名称
  test
  ├── controller
  │   └── home.test.js
  ├── hello.test.js
  └── service
      └── user.test.js

  4.4EggJS规定我们使用 egg-bin test来运行我们编写的测试文件
  * */
};
