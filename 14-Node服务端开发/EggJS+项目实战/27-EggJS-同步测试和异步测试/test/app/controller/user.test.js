'use strict';
const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  /*
  Mocha: 同步测试和异步测试
  * */
  it('同步测试', () => {
    // console.log('it');
    // 模拟了一个上下文
    let ctx = app.mockContext({
      session:{name:'lnj'}
    });
    // 希望上下文中有session, 并且保存了name, 并且name是lnj
    // 以下代码的含义: 断定上下文中有session, session中有name,name取值是lnj
    assert(ctx.session.name === 'lnj');
  });
  it('异步测试-promise', ()=>{
    return app.httpRequest().get('/public/login.html').expect(200);
  });
  it('异步测试-callback', (done)=>{
     app.httpRequest().get('/public/login.html').expect(200, done);
  });
  it('异步测试-async+await', async ()=>{
    await app.httpRequest().get('/public/login.html').expect(200);
  });
});
