module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    EggJS如何处理日志?
    https://eggjs.org/zh-cn/core/logger.html

    1.日志分类
    ${appInfo.name}-web.log - 应用相关日志，供应用开发者使用的日志。我们在绝大数情况下都在使用它
    egg-web.log             - 框架内核、插件日志
    common-error.log        - ctx.logger.error输出的 错误日志
    egg-agent.log           - 进程日志，框架和使用到 agent 进程执行任务的插件会打印一些日志到这里
    egg-schedule.log        - 定时任务的日志
    */
    /*
    2.日志级别
    NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别
    3.如何输出日志
    ctx.logger.xxx
    4.如何切割日志
    默认自动按照天切割, 也可以手动配置按照大小,按照小时切割
    * */
    router.get('/test', controller.home.test);
}