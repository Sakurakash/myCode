'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        // console.log(ctx.request.body);
        // 1.校验数据是否符合预期
        let res =  await ctx.validate('schema.user', ctx.request.body);
        // console.log('校验结果', res);
        // 2.根据校验结果做出对应的处理
        if(res){
            // 将校验通过的数据交给Service存储到数据库中
        }else{
            // 告诉前端数据不符合预期
            // this.ctx.body = {
            //     code:400,
            //     msg:'数据不符合预期'
            // }
            ctx.error(400, ctx.helper.errorCode[400]);
        }
    }
}

module.exports = UserController;
