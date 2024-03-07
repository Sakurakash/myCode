module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    1.EggJS中间件
    EggJS是基于KOA的, 所以EggJS的中间件形式和 Koa 的中间件形式是一样的
    只不过EggJS规定我们需要将中间件写到特殊的目录中
    只不过EggJS中为中间件提供了多种使用方式
    https://eggjs.org/zh-cn/basics/middleware.html
    * */
    let clientCheck = app.middleware.clientCheck({ua:/Chrome/});
    router.get('/test', clientCheck, controller.home.test);
    router.get('/', controller.home.index);
}