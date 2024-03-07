const Service = require('egg').Service;

class HomeService extends Service{
    async insertUser({name, age}){
        try {
            let res = await this.ctx.app.mysql.insert('user', {name:name, age:age});
            return res.affectedRows === 1;
        }catch (e) {
            console.error(e);
            return false;
        }
    }
}

module.exports = HomeService;