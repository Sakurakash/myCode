const Controller = require('egg').Controller;

class HomeController extends Controller{
    async test(){
        this.ctx.body = '我是test';
    }
    async index(){
        this.ctx.body = '我是index';
    }
}
module.exports = HomeController;