module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    1.EggJS国际化(I18N)
    什么是国际化? 国际化就是多语言,
    能够让你的网页在不同的国家显示不同的语言
    能够让你的网页支持语言切换
    https://eggjs.org/zh-cn/core/i18n.html
    * */
    router.get('/test', controller.home.test);
}