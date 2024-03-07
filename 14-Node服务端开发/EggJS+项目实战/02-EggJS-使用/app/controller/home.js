const Controller = require('egg').Controller;

class HomeController extends Controller{
    async index(){
        /*
        在EggJS中, EggJS会自动给控制器的this挂载一些属性
        this.ctx: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
        this.app: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
        this.service：应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
        this.config：应用运行时的配置项。
        this.logger：logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。
        * */
        this.ctx.body = 'www.it666.com';
    }
}

module.exports = HomeController;
