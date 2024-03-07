module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    /*
    1.EggJS如何处理静态资源?
    不用处理, 默认已经处理好了
    * */
    router.get('/user', controller.home.getQuery);
    router.get('/register/:name/:age', controller.home.getParams);
    router.post('/login', controller.home.getBody);
}