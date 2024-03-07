module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    1.EggJS如何使用Sequelize
    https://eggjs.org/zh-cn/tutorials/sequelize.html
    * */
    // /insert?name=lnj&age=33
    router.get('/insert', controller.home.insertUser);
}