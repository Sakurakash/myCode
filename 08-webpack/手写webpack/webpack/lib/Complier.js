const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const parser = require("@babel/parser");
const traverse =  require("@babel/traverse").default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');
const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook
} = require("tapable");

class Compiler {
    constructor(config) {
        // 保存配置
        this.config = config;
        // 保存模块的依赖
        this.modules = {};
        // 创建发布者
        this.hooks = {
            entryOption: new SyncBailHook(),
            done: new SyncHook()
        }
        // 获取插件, 调用插件的apply方法, 并且将当前的编译对象传递给插件
        let plugins = this.config.plugins;
        // console.log(plugins);
        plugins.forEach((plugin) => {
            plugin.apply(this);
        });
    }

    run() {
        this.buildModule(this.config.entry);
        this.emitFile();
        this.hooks.done.call();
    }

    buildModule(modulePath){
        // 1.拿到主模块代码
        let code = this.getSource(modulePath);
        // 2.修改当前模块的代码
        let {resultCode, dependencies} = this.parseModule(code);
        // 3.将主模块的路径和代码保存到modules中
        this.modules[modulePath] = resultCode;
        // 4.处理依赖模块, 将依赖模块的路径和代码也保存到modules中
        dependencies.forEach((depPath) => {
            this.buildModule(depPath);
        })
    }

    parseModule(code){
        // 1.将当前模块的代码转换成抽象语法树
        let ast = parser.parse(code);
        // 定义变量保存主模块地址
        let rootPath = path.dirname(this.config.entry);
        // 定义数组保存当前模块所有的依赖
        let dependencies = [];
        // 2.修改抽象语法树中的内容
        traverse(ast, {
            CallExpression(nodePath){
                let node = nodePath.node;
                if(node.callee.name === "require"){
                    // 2.1将require修改为__webpack_require__
                    node.callee.name = "__webpack_require__";
                    // 2.2修改require导入的路径
                    let modulePath = node.arguments[0].value;
                    modulePath = ".\\" +path.join(rootPath, modulePath);
                    modulePath = modulePath.replace(/\\/g, "/");
                    dependencies.push(modulePath);
                    node.arguments = [t.stringLiteral(modulePath)];
                }
            }
        });
        // 3.将修改之后的抽象语法树转换成代码
        let resultCode = generate(ast).code;
        // 4.返回结果
        return {resultCode, dependencies};
    }

    getSource(modulePath){ // ./a.js ./index.less
        let content = fs.readFileSync(modulePath, "utf8");
        if(!this.config.module){
            return content;
        }
        // 1.拿到配置文件中的所有规则
        let rules = this.config.module.rules;
        // 2.依次取出每一个规则
        rules.forEach(function (rule) {
            // 通过解构赋值, 那么对应的正则表达式和对应的loader
            let {test, use} = rule;
            // 判断当前的文件是否需要通过loader来处理
            if(test.test(modulePath)){
                // 由于loader需要从右至左, 从下至上的执行
                // 所以需要从后往前取
                for(let i = use.length - 1; i >= 0; i--){
                    let loader = require(use[i]['loader']);
                    content = loader(content);
                }
            }
        })
        // 如果读取到的是JS代码, 那么可以直接返回
        // 如果读取到的不是JS代码, 那么就需要通过loader处理之后才能返回
        return content;
    }

    emitFile() {
        // 1.读取EJS模板
        let templatePath = path.resolve(__dirname, 'main.ejs');
        let template = fs.readFileSync(templatePath, 'utf8');
        // 2.利用变量替换模板中的内容
        let resultCode = ejs.render(template, {
            entryId: this.config.entry,
            modules: this.modules
        });
        // 3.将最终的内容写入到文件中
        // 3.1拿到输出的目录
        let outputDir = this.config.output.path;
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }
        let outputPath = path.resolve(outputDir, this.config.output.filename);
        fs.writeFileSync(outputPath, resultCode);
    }
}

module.exports = Compiler;
