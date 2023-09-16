const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { IgnorePlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { DllReferencePlugin } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const fs = require('fs');

const config = {
    stats: 'none',
    /* externals: {
        /!*
        以下配置的含义:
        告诉webpack我们在通过import导入jquery的时候, 不是导入node_modules中的jquery
        而是导入我们全局引入的jquery
        * *!/
        jquery: 'jQuery',
        lodash: '_'
    }, */
    resolve: {
        alias: {
            // 创建 import 或 require 的别名，来确保模块引入变得更简单
            // bootstrapCss: path.join(__dirname, 'node_modules/bootstrap/dist/css/bootstrap.css'), // 绝对路径
            bootstrapCss: 'bootstrap/dist/css/bootstrap.css'
        }
        // 指定模块入口的查找顺序
        // mainFields: ['style', 'main'],
        // 指定导入模块查找顺序
        // extensions: ['.css', '.js', '.json'],
        // 指定查找范围, 告诉webpack只在node_modules中查找
        // modules: ['node_modules']
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 1000,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name(module, chunks, key) {
                        return `${key}_${chunks.map((item) => item.name).join('~')}`;
                    }
                },
                default: {
                    priority: -20,
                    name(module, chunks, key) {
                        return `${key}_${chunks.map((item) => item.name).join('~')}`;
                    }
                }
            }

        }
    },
    entry: {
        index: './src/js/index.js',
        detail: './src/js/detail.js'
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'bundle')// 指定输出路径
    },
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    sources: true
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
                    'css-loader'
                ]// 多个loader会从右至左依次执行
            }
        ]
    }
};
config.plugins = makePlugins();
function makePlugins() {
    const plugins = [
        new BundleAnalyzerPlugin(),
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './css/[name].css'
        }),
        new ESLintPlugin({
            fix: true,
            exclude: 'node_modules'
        }),
        /*
        以下代码的含义:
        在打包moment这个库的时候, 将整个locale目录都忽略掉
        * */
        new IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        })
    ];
    Object.keys(config.entry).forEach(function(key) {
        plugins.push(new HtmlWebpackPlugin({
            // 指定打包的模板, 如果不指定会自动生成一个空的
            template: './src/index.html',
            filename: key + '.html',
            chunks: [key]
        }));
    });

    const dllPath = path.resolve(__dirname, 'dll');
    const files = fs.readdirSync(dllPath);
    files.forEach(function(file) {
        if (file.endsWith('.js')) {
            plugins.push(new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, 'dll', file),
                publicPath: './'
            }));
        } else if (file.endsWith('.json')) {
            plugins.push(new DllReferencePlugin({
                manifest: path.resolve(__dirname, 'dll', file)
            }));
        } else if (file.endsWith('.txt')) {
            const filePath = path.resolve(dllPath, file);
            fs.unlinkSync(filePath);
        }
    });
    return plugins;
}
module.exports = config;
