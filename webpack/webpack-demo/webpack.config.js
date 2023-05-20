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
        assetModuleFilename: 'images/[name][ext]',// 指定输出文件名
        // publicPath: 'https://www.it666.com/'// 指定输出前缀
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                type: "asset/resource"// file-loader的替代
                // type: "asset/source"// url-loader的替代
            },
            {
                test: /\.css$/i,
                // css-loader: 解析css中的@import行为
                // style-loader: 将css插入到head中
                use: ["style-loader", "css-loader", 'postcss-loader']// 多个loader会从右至左依次执行
            },
            {
                test: /\.less$/i,
                use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']// 将Less编译为CSS
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']// 将Sass编译成CSS
            },

        ]
    }
};