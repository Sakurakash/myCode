'use strict';
/*
app   :服务端实例对象
mock  :egg提供给我们的辅助模块对象
assert:断言库对象
* */
const { app, mock, assert } = require('egg-mock/bootstrap');
/*
在测试文件中一个describe函数就是一组相关的测试
也就是说我们需要把一组相关的测试写到一个describe函数中
第一个参数: 这组测试的名称
第二个参数: 编写这组测试具体代码的地方
* */
describe('test/app/controller/user.test.js', () => {
  /*
  在一个describe方法中的一个it就是一个测试用例
  一个it可以用来测试一个方法(函数)
  第一个参数: 给当前的这个测试取的名称
  第二个参数: 编写具体测试代码的函数
  * */
  // it('should assert', () => {
  //
  // });
  /*
  Mocha测试库的生命周期钩子
  单个测试用例的
  before -> beforeEach -> it -> afterEach -> after
  多个测试用例
  before -> beforeEach -> it -> afterEach -> beforeEach -> it -> afterEach -> after
  before ->
  beforeEach -> it -> afterEach
  beforeEach -> it -> afterEach
  beforeEach -> it -> afterEach
  -> after

  生命周期钩子的作用:
  我们可以在测试用例执行之前去申请一些资源
  我们可以在测试用例执行之后去释放申请的资源
  例如: 我们需要测试数据库, 那么我们可以在测试之前往数据库中添加一些测试数据
        然后在测试完成之后删除这些测试数据
  * */
  before(()=>{
    console.log('before');
  });
  beforeEach(()=>{
    console.log('beforeEach');
  });
  it('具体的测试用例', () => {
    console.log('it');
  });
  it('具体的测试用例', () => {
    console.log('it');
  });
  it('具体的测试用例', () => {
    console.log('it');
  });
  afterEach(()=>{
    console.log('afterEach');
  });
  after(()=>{
    console.log('after');
  });
});
