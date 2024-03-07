module.exports = app => {
    /*
    {
      env: 'local',
      name: 'egg-example',
      baseDir: 'C:\\Users\\Jonathan_Lee\\Desktop\\Node_Common\\egg-example',
      subdomainOffset: 2,
      config: '<egg config>',
      controller: '<egg controller>',
      httpclient: '<egg httpclient>',
      loggers: '<egg loggers>',
      middlewares: '<egg middlewares>',
      router: '<egg router>',
      serviceClasses: '<egg serviceClasses>'
    }
    * */
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.利用处理路由的对象监听路由的请求
    router.get('/', controller.home.index);
    /*
    1.EggJS如何处理Get/Post请求参数?
    "和Koa一样"
    * */
    router.get('/user', controller.home.getQuery);
    router.get('/register/:name/:age', controller.home.getParams);
    router.post('/login', controller.home.getBody);
}