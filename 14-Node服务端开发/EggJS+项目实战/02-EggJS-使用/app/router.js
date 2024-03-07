// 在router.js中必须暴露出去一个方法, 这个方法接收一个参数, 这个参数就是服务端的实例对象
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
    // console.log(app);
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.利用处理路由的对象监听路由的请求
    //   由于EggJS是基于KOA的, 所以监听方式和KOA一样
    /*
    在EggJS中不用导入控制器, 只要拿到了从服务器实例中解构出来的控制器对象
    就相当于拿到了controller目录, 我们就可以通过点语法拿到这个目录中的文件
    只要拿到了controller目录中的文件, 我们就可以通过点语法拿到这个文件中的方法
    * */
    router.get('/', controller.home.index);
}