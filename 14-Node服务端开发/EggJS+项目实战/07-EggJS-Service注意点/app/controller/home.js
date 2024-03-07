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
    async getHome(){
        await this.ctx.render('index', {msg:'知播渔'});
    }
    async getNews(){
        /*
        注意点:
        1.service目录必须放在app目录中
        2.service目录支持多级目录, 如果是多级目录, 那么在调用的时候可以使用链式调用
          this.ctx.service.abc.def.text.xxx();
        3.service中的js文件, 如果是以_或者首字母都是大写, 那么在调用的时候必须转换成驼峰命名
          get_user.js --- getUser
          GetUser.js --- getUser
        * */
        this.ctx.body = await this.ctx.service.home.findNews();
    }
}

module.exports = HomeController;
