const Controller = require('egg').Controller;

class HomeController extends Controller{
    async insertUser(){
        // this.ctx.query = {name:lnj, age:33}
        let res = await this.ctx.service.home.insertUser(this.ctx.query);
        if(res){
            this.ctx.body = '插入成功';
        }else{
            this.ctx.body = '插入失败';
        }
    }
}
module.exports = HomeController;