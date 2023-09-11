const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    /*
    watch: true,
    watchOptions: {
        aggregateTimeout: 200, // 防抖, 和函数防抖一样, 改变过程中不重新打包, 只有改变完成指定时间后才打包
        poll: 1000, // 每隔多少时间检查一次变动
        ignored: /node_modules/, // 排除一些巨大的文件夹, 不需要监控的文件夹
    },
    */
    devServer: {
        static: {
            directory: path.join(__dirname, 'bundle'), // 指定HTML文件所在的目录
        },
        open: true, // 是否自动在浏览器中打开
        port: 8080, // 自定义DevServer的端口号
        /*proxy: {
            // 以下配置的含义:
            // 当我们在代码中发送请求到/user的时候, devServer就会自动将我们请求的地址替换为
            // http://127.0.0.1:3000/user
            "/user": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,     // 域名跨域
                secure: false,          // https跨域
            },
            "/login": {
                target: "http://127.0.0.1:3000",
                changeOrigin: true,     // 域名跨域
                secure: false,          // https跨域
            }
        }*/
        proxy: [{
            context:["/user", "/login"],
            target: "http://127.0.0.1:3000", // 代理地址
            changeOrigin: true, // 域名跨域
            secure: false, // https跨域
            pathRewrite:{"": "/api"} // 路径重写, 将路径中的api替换为空
        }]
    },
    devtool: "cheap-module-source-map",
    mode: "development", // development || production
    entry: './src/js/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'bundle'),// 指定输出路径
    },
    module: {
        rules: [
            // 打包字体图标规则
            {
                test: /\.(eot|json|svg|ttf|woff|woff2)$/,
                type: "asset/resource",
                generator: {
                    filename: 'font/[name][ext]',// 指定输出文件目录
                }
            },
            // 打包图片规则
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset/resource",// file-loader的替代
                generator: {
                    filename: 'images/[name][ext]',// 指定输出文件目录
                }
            },
            // 打包CSS规则
            {
                test: /\.css$/i,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]// 多个loader会从右至左依次执行
            },
            // 打包LESS规则
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader']// 将Less编译为CSS
            },
            // 打包SCSS规则
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']// 将Sass编译成CSS
            },

        ]
    },
    optimization: {
        minimizer: [
            // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
    },
    // plugins: 告诉webpack需要新增一些什么样的功能
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: "./doc", to: "doc" },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),
    ],
};