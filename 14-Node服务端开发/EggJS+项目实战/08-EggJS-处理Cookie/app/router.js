module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    EggJS如何处理Cookie?
    和Koa一样
    * */
    router.get('/setCookie', controller.home.setCookie);
    router.get('/getCookie', controller.home.getCookie);
}