const path = require("path");
module.exports = {
    // devtool: "eval-cheap-module-source-map",
    devtool: "cheap-module-source-map",
    // mode: "production", // development || production
    mode: "development", // development || production
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'bundle'),// 指定输出路径
        assetModuleFilename: 'images/[name][ext]',// 指定resource输出文件目录
        // publicPath: 'https://www.it666.com/'// 指定输出前缀
    },
    module: {
        rules: [
            // 打包图片规则
            {
                test: /\.(png|jpg|gif)$/,
                // type: "asset/resource",// file-loader的替代
                type: "asset/inline",// url-loader的替代
                /*generator: {
                    filename: 'images/[name][ext]'// Rule.generator.filename 与 output.assetModuleFilename 相同，并且仅适用于 asset 和 asset/resource 模块类型。
                }*/
            },
            // 打包CSS规则
            {
                test: /\.css$/i,
                // css-loader: 解析css中的@import行为
                // style-loader: 将css插入到head中
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ]// 多个loader会从右至左依次执行
            },
            // 打包LESS规则
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']// 将Less编译为CSS
            },
            // 打包SCSS规则
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']// 将Sass编译成CSS
            },

        ]
    }
};