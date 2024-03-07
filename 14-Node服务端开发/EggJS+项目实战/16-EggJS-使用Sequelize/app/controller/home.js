const Controller = require('egg').Controller;

class HomeController extends Controller{
    async insertUser(){
        // this.ctx.query = {name:lnj, age:33}
        let res = await this.ctx.service.home.insertUser(this.ctx.query);
        this.ctx.body = res;
    }
}
module.exports = HomeController;