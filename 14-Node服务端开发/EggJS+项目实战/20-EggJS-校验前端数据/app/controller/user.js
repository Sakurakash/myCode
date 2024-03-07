'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        // console.log(ctx.request.body);
        // 1.校验数据是否符合预期
        let res =  await ctx.validate('schema.user', this.ctx.request.body);
        console.log('校验结果', res);
    }
}

module.exports = UserController;
