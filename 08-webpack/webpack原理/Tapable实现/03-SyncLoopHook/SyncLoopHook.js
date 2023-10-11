// 定义一个类作为发布者
class SyncLoopHook {
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
            let result = undefined;
            do{
                result = task(...args);
            }while (result !== undefined);
        })
    }
}
module.exports = SyncLoopHook;
