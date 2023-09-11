const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'bundle') // 指定HTML文件所在的目录
        },
        open: true, // 是否自动在浏览器中打开
        port: 8080 // 自定义DevServer的端口号
    },
    devtool: 'cheap-module-source-map',
    mode: 'development', // development || production
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundle.js',
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
                                chrome: '35'
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
                    filename: 'images/[name][ext]'// 指定输出文件目录
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
            filename: './css/[name].css'
        }),
        new ESLintPlugin({
            fix: true,
            exclude: 'node_modules'
        })
    ]
};
