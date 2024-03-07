module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    1.EggJS启动任务(计划任务)?
    我们当前编写的定时任务需要启动之后一段时间之后才会执行
    那么如果我们先启动之后就立刻同步数据,立刻执行应该怎么做呢?
    可以使用EggJS的启动自定义
    * */
    router.get('/test', controller.home.test);
}