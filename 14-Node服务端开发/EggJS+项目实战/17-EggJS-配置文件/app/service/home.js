const Service = require('egg').Service;

class HomeService extends Service{
    async insertUser({name, age}){
        try {
            let res = await this.ctx.model.User.create({name:name, age:age});
            return res.dataValues;
        }catch (e) {
            return '插入失败';
        }
    }
}

module.exports = HomeService;