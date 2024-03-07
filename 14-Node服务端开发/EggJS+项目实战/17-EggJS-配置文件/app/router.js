module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    1.EggJS配置文件
    EggJS给我们提供了多种配置文件, 方便我们在不同的阶段中使用
    config.prod.js     // 只有线上环境会加载
    config.test.js     // 只有测试环境会加载
    config.local.js     // 只有开发环境会加载
    config.default.js  // 所有环境都会加载
    如果出现同名的配置, 后面三个配置文件中的配置会覆盖default中的配置
    https://eggjs.org/zh-cn/basics/config.html

    2.如何设置当前环境?
    EGG_SERVER_ENV=xxx
    https://eggjs.org/zh-cn/basics/env.html
    * */
    // /insert?name=lnj&age=33
    router.get('/insert', controller.home.insertUser);
}