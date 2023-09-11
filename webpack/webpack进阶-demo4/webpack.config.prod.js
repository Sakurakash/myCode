const glob = require('glob-all');
const path = require('path');
const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');

const ProdConfig = {
    devtool: 'cheap-module-source-map',
    mode: 'production', // development || production
    plugins: [
        new CssMinimizerPlugin(),
        new PurgeCSSPlugin({
            // 告诉PurgeCSSPlugin需要过滤哪些文件
            paths: glob.sync([
                path.join(__dirname, 'src/*.html'),
                path.join(__dirname, 'src/js/*.js')
            ])
        })
    ]
};

// noinspection JSCheckFunctionSignatures
module.exports = merge(CommonConfig, ProdConfig);
