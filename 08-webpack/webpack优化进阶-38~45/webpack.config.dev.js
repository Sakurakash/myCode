const path = require('path');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');
const DevConfig = {
    optimization: {
        usedExports: true
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'bundle') // 指定HTML文件所在的目录
        },
        open: true, // 是否自动在浏览器中打开
        port: 8080 // 自定义DevServer的端口号
    },
    devtool: 'eval-cheap-source-map',
    mode: 'development', // development || production
    plugins: []
};

// noinspection JSCheckFunctionSignatures
module.exports = merge(CommonConfig, DevConfig);
