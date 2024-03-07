module.exports = app => {
    // 1.从服务端的实例对象中解构出处理路由的对象和处理控制器的对象
    const {router, controller} = app;
    // 2.处理路由
    /*
    1.EggJS扩展
    默认情况下EggJS在Application、Context、Request、Response对象上
    提供了很多常用的方法给我们使用, 但是有时候默认提供的这些方法可能不能满足我们的需求
    此时我们就可以通过EggJS的扩展来给这些对象扩充自定义的方法
    https://eggjs.org/zh-cn/basics/extend.html
    * */
    router.get('/test', controller.home.test);
}