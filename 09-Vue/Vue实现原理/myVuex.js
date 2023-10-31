// import Vue from 'vue'
/*
install方法会在外界调用Vue.use的时候执行
并且在执行的时候会把Vue实例和一些额外的参数传递给我们
* */
const install = (Vue)=>{
    // 给每一个Vue实例都添加一个$store属性
    /*
    在Vue中有一个名称叫做mixin方法, 这个方法会在创建每一个Vue实例的时候执行
    所以我们可以通过mixin方法给每一个Vue实例添加$store属性
    * */
    Vue.mixin({
        beforeCreate(){
            /*
            Vue在创建实例的时候会先创建父组件, 然后再创建子组件
            * */
            /*
            Root -> App -> HelloWorld
            如果是根组件, 那么默认就有store
            我们只需要将store变成$store即可
             */
            if(this.$options && this.$options.store){
                this.$store = this.$options.store;
            }
            // 如果不是根组件, 那么默认没有store
            // 我们只需要将它父组件的$store赋值给它即可
            else{
                this.$store = this.$parent.$store;
            }
        }
    });
}
class ModuleCollection {
    constructor(rootModule){
        this.register([], rootModule);
    }
    register(arr, rootModule){
        // console.log(arr); // [] [home] [account] [account, login]
        // 1.按照我们需要的格式创建模块
        let module = {
            _raw: rootModule,
            _state: rootModule.state,
            _children: {}
        }
        // 2.保存模块信息
        if(arr.length === 0){
            // 保存根模块
            this.root = module;
        }else{
            // 保存子模块
            // this.root._children[arr[arr.length-1]] = module;
            // let testArr = ['account', 'login'];
            // let res = testArr.splice(0, testArr.length - 1);
            // console.log(res);
            // ['a', 'b', 'c'] -> ['a', 'b']
            let parent = arr.splice(0, arr.length-1).reduce((root, currentKey)=>{
                return root._children[currentKey];
            }, this.root);
            parent._children[arr[arr.length-1]] = module;
        }
        // 3.处理子模块
        for(let childrenModuleName in rootModule.modules){
            let childrenModule = rootModule.modules[childrenModuleName];
            this.register(arr.concat(childrenModuleName) ,childrenModule)
        }
    }
}
class Store {
    constructor(options){
        // 将传递进来的state放到Store上
        Vue.util.defineReactive(this, 'state', options.state);
        // 提取模块信息
        this.modules = new ModuleCollection(options);
        // 安装子模块的数据
        this.initModules([], this.modules.root);
    }
    initModules(arr, rootModule){
        // console.log(arr); // [] [home] [account] [account, login]
        // 如果当前是子模块, 那么就需要将数据安装到this.state上
        if(arr.length > 0){
            let parent = arr.splice(0, arr.length-1).reduce((state, currentKey)=>{
                return state[currentKey];
            }, this.state);
            Vue.set(parent, arr[arr.length-1], rootModule._state);
        }
        // 将传递进来的getters放到Store上
        this.initGetters(rootModule._raw);
        // 将传递进来的mutations放到Store上
        this.initMutations(rootModule._raw);
        // 将传递进来的actions放到Store上
        this.initActions(rootModule._raw);
        // 如果当前不是子模块, 那么就需要从根模块中取出子模块的信息来安装
        for(let childrenModuleName in rootModule._children){
            let  childrenModule = rootModule._children[childrenModuleName];
            this.initModules(arr.concat(childrenModuleName), childrenModule);
        }
    }
    dispatch = (type, payload)=>{
        this.actions[type].forEach(fn=>fn(payload));
    }
    initActions(options){
        // 1.拿到传递进来的actions
        let actions = options.actions || {};
        // 2.在Store上新增一个actions的属性
        this.actions = this.actions || {};
        // 3.将传递进来的actions中的方法添加到当前Store的actions上
        for(let key in actions){
            this.actions[key] = this.actions[key] || [];
            this.actions[key].push((payload)=>{
                actions[key](this, payload);
            });
        }
    }
    commit = (type, payload)=>{
        // console.log(this);
        this.mutations[type].forEach(fn=>fn(payload));
    }
    initMutations(options){
        // 1.拿到传递进来的mutations
        let mutations = options.mutations || {};
        // 2.在Store上新增一个mutations的属性
        this.mutations = this.mutations || {};
        // 3.将传递进来的mutations中的方法添加到当前Store的mutations上
        for(let key in mutations){
            this.mutations[key] = this.mutations[key] || [];
            this.mutations[key].push((payload)=>{
                mutations[key](options.state, payload);
            });
        }
    }
    initGetters(options){
        // 1.拿到传递进来的getters
        let getters = options.getters || {};
        // 2.在Store上新增一个getters的属性
        this.getters = this.getters || {};
        // 3.将传递进来的getters中的方法添加到当前Store的getters上
        for(let key in getters){
            Object.defineProperty(this.getters, key, {
                get:()=>{
                    return getters[key](options.state);
                }
            })
        }
    }
}
export default {
    install,
    Store
}
