const Controller = require('egg').Controller;

class HomeController extends Controller{
    async test(){
        // console.log(this.ctx.app.myTest('123'));
        // console.log(this.ctx.myTest('abc'));
        // console.log(this.ctx.request.myTest('666'));
        // console.log(this.ctx.response.myTest('888'));
        console.log(this.ctx.helper.md5('abc123'));
        await this.ctx.render('index', {msg:'www.it666.com'});
    }
}
module.exports = HomeController;