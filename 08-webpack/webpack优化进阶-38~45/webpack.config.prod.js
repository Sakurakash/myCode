const { merge } = require('webpack-merge');
const CommonConfig = require('./webpack.config.common.js');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const ProdConfig = {
    devtool: 'cheap-module-source-map',
    mode: 'production', // development || production
    plugins: [
        new CssMinimizerPlugin()
    ]
};

// noinspection JSCheckFunctionSignatures
module.exports = merge(CommonConfig, ProdConfig);
