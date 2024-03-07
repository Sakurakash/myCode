'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  /*
  保存登录状态:
  https://eggjs.org/zh-cn/core/cookie-and-session.html
  https://www.npmjs.com/package/egg-session-redis
  https://www.npmjs.com/package/egg-redis
  ctx.session.xxx = xxx;
  * */
  router.get('/test', controller.user.test);
};
