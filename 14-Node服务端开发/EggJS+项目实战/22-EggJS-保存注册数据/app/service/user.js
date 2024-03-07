const Service = require('egg').Service;

class UserService extends Service{
    async createUser({username, password, gender}){
        /*
        CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'primary key',
  `username` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'user name',
  `password` varchar(2555) DEFAULT NULL COMMENT 'user age',
  `gender` enum('男','女','妖') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL COMMENT 'created time',
  `updated_at` datetime DEFAULT NULL COMMENT 'updated time',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='user';
        * */
        let res = await this.ctx.model.User.create({username, password, gender});
        return res.dataValues;
    }
}
module.exports = UserService;