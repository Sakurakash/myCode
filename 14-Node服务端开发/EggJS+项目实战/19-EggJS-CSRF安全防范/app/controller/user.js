'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        /*
        想要拿到表单提交的数据, 那么在提交数据的时候必须将服务端给客户端设置的csrfToken也传递过来才可以
        * */
        console.log(ctx.request.body);
    }
}

module.exports = UserController;
