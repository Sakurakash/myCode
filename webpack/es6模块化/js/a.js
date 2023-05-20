let name = "张三";
let age = "33";
export {name};
export {age};// 使用export导出对象(可多次使用)
class People {
    constructor() {
        this.name = "李四";
        this.age = "44";
    }
}
export default People;// 使用export default导出默认值(只能有一个)