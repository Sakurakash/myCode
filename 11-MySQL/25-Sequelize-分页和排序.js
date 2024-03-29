// 1.导入Sequelize
const { Sequelize,
    DataTypes
} = require('sequelize');

(async ()=>{
    // 2.配置连接信息DataTypes
    /*
    第一个参数: 要操作的数据库名称
    第二个参数: 数据库用户名
    第三个参数: 数据库密码
    第四个参数: 其它的配置信息
    * */
    const sequelize = new Sequelize('demo', 'root', 'weiyuhua666', {
        host: '127.0.0.1', // MySQL服务器地址
        port: 3306, // MySQL服务器端口号
        // 注意点: Sequelize不仅仅能操作MySQL还能够操作其它类型的数据库
        dialect: 'mysql', // 告诉Sequelize当前要操作的数据库类型
        pool: {
            max: 5, // 最多有多少个连接
            min: 0, // 最少有多少个连接
            idle: 10000, // 当前连接多久没有操作就断开
            acquire: 30000, // 多久没有获取到连接就断开
        }
    });

    // 3.创建模型
    let User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING, // varchar(255)
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.TINYINT,
            defaultValue: 66
        },
        gender: {
            type: DataTypes.ENUM('男', '女', '妖'),
            defaultValue: '妖'
        }
    }, {
        freezeTableName: true, // 告诉sequelize不需要自动将表名变成复数
        // tableName: 'student', // 自定义表名
        timestamps: false, // 不需要自动创建createAt/updateAt这两个字段
        indexes: [ // 指定索引
            {
                name: 'idx_age', // 索引名称
                fields: ['age'], // 索引字段名称
            }
        ]
    });
    // sequelize.sync();

    // 4.分页
    // let us = await User.findAll({
    //     offset: 2 // 跳过多少条数据
    // });
    // console.log(us.map(u => u.dataValues));

    // let us = await User.findAll({
    //     limit: 2 // 取多少条数据
    // });
    // console.log(us.map(u => u.dataValues));

    // let us = await User.findAll({
    //     offset: 2, // 跳过多少条数据
    //     limit: 2 // 取多少条数据
    // });
    // console.log(us.map(u => u.dataValues));

    // 5.排序
    let us = await User.findAll({
        order: [
            // ['id', 'desc']
            ['age', 'desc'],
            ['id', 'desc']
        ]
    });
    console.log(us.map(u => u.dataValues));
})();

