const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    entry: './src/js/index.js',
    output: {
        filename: 'js/[name][contenthash:8].js',
        path: path.resolve(__dirname, 'bundle')// 指定输出路径
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 不做处理的目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            targets: {
                                chrome: '100'
                            },
                            useBuiltIns: 'usage',
                            corejs: 3
                        }]]
                    }
                }
            },
            // 打包图片规则
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][contenthash:8][ext]'// 指定输出文件目录
                }
            },
            // 打包CSS规则
            {
                test: /\.css$/i,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]// 多个loader会从右至左依次执行
            }
        ]
    },
    // plugins: 告诉webpack需要新增一些什么样的功能
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name][contenthash:8].css'
        }),
        new ESLintPlugin({
            fix: true,
            exclude: 'node_modules'
        })
    ]
};
