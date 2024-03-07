const Controller = require('egg').Controller;

class HomeController extends Controller{
    async test(){
        // await this.ctx.render('index', {msg:'www.it666.com'});
        await this.ctx.render('index', {msg:this.ctx.app.msg});
    }
}
module.exports = HomeController;