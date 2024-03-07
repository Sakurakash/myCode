const Controller = require('egg').Controller;

class HomeController extends Controller{
    async test(){
        /*
        注意点:
        默认只会输出 INFO 及以上（WARN 和 ERROR）的日志到文件中。
        如果需要输出debug日志, 那么就必须修改config.default.js配置文件
        https://eggjs.org/zh-cn/core/logger.html#%E6%97%A5%E5%BF%97%E7%BA%A7%E5%88%AB
        * */
        /*
        EggJS中如何切割日志?
        在EggJS中不用我们手动的去切割, 默认情况下EggJS就会自动帮我们切割
        默认情况下每一天就是一个新的日志文件
        例如: common-error.log
              common-error.log.2022-12-12
        * */
        this.ctx.logger.debug('我是debug日志');
        this.ctx.logger.info('我是info日志');
        this.ctx.logger.warn('我是warn日志');
        this.ctx.logger.error('我是error日志');
    }
}
module.exports = HomeController;