const Controller = require('egg').Controller;

class HomeController extends Controller{
    async index(){
        this.ctx.body = 'www.it666.com';
    }
    async getQuery(){
        // 获取传统get请求参数
        // this.ctx.request.query
        this.ctx.body = this.ctx.query;
    }
    async getParams(){
        // 获取动态路由形式的get请求参数
        this.ctx.body = this.ctx.params;
    }
    async getBody(){
        // 获取post请求参数
        this.ctx.body = this.ctx.request.body;
    }
}

module.exports = HomeController;
