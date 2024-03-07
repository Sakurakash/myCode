module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    /*
    EggJS处理数据
    在EggJS中无论是处理数据库中的数据还是处理网络数据, 都是在Service中处理的
    * */
    router.get('/user', controller.home.getQuery);
    router.get('/register/:name/:age', controller.home.getParams);
    router.post('/login', controller.home.getBody);
    router.get('/home', controller.home.getHome);
    router.get('/news', controller.home.getNews);
}