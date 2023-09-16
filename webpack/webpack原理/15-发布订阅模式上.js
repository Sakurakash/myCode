/*
1.什么是发布订阅模式?
你去买东西断货了, 老板让你留下联系方式, 到货了给你打电话, 这就是发布订阅模式
老板就是发布者, 你就是订阅者
订阅者将电话添加到了发布者的缓存列表中(电话簿)
当发布者到货后就会遍历缓存列表依次通知所有订阅者
*/
// 定义一个类作为发布者
class SyncHook {
    constructor(args){
        // 缓存列表
        this.tasks = [];
        // 定义属性保存将来会给订阅者传递多少个参数
        this.args = args;
    }
    // 用于订阅的方法
    tap(tag, task){
        this.tasks.push(task);
    }
    // 用于发布的方法
    call(...args){
        if(args.length < this.args.length){
            return new Error("参数个数不对");
        }
        args = args.slice(0, this.args.length);
        this.tasks.forEach(function (task) {
            task(...args);
        })
    }
}
export default SyncHook;
/* // 1.创建发布者
let hook = new SyncHook(["name", "price"]);
// 2.订阅者像发布者订阅
hook.tap("zs", function (name, price) {
    console.log(name, price);
});
hook.tap("ls", function (name, price) {
    console.log(name, price);
});
hook.tap("ww", function (name, price) {
    console.log(name, price);
});
// 3.发布者发布消息
hook.call("豪车", 88888, 666); */
