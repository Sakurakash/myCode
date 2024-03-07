const Controller = require('egg').Controller;

class HomeController extends Controller{
    async test(){
        return await this.ctx.render('index', {msg: this.ctx.__('Email')})
    }
}
module.exports = HomeController;