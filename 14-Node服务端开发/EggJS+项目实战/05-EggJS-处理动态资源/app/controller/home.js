const Controller = require('egg').Controller;

class HomeController extends Controller{
    async index(){
        this.ctx.body = 'www.it666.com';
    }
    async getQuery(){
        // 获取传统get请求参数
        // this.ctx.request.query
        let query = this.ctx.query;
        this.ctx.body = query;
    }
    async getParams(){
        // 获取动态路由形式的get请求参数
        let params = this.ctx.params;
        this.ctx.body = params;
    }
    async getBody(){
        // 获取post请求参数
        let body = this.ctx.request.body;
        this.ctx.body = body;
    }
    async getHome(){
        await this.ctx.render('index', {msg:'知播渔'});
    }
}

module.exports = HomeController;