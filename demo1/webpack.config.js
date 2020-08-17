// webpack 时 node写出来的， node的写法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let OptimizeCss = require('optimize-css-assets-webpack-plugin')
let UglifyjsWebpack = require('uglifyjs-webpack-plugin')
module.exports = {
    optimization: { // 优化项
        minimizer: [
            new UglifyjsWebpack({
                cache: true, // 是否需要缓存
                parallel: true, // 是否需要并发打包，也就是一次性打包多个 js文件
                sourceMap: true
            }),
            new OptimizeCss()
        ]
    },
    devServer: { // 开发服务的配置
        port: 3000, // 重新设置端口号，默认为 8080
        progress: true, // 打包时显示进度条
        contentBase: './dist', // 设置 dist文件夹 来执行静态服务
        compress: true // 启动 ggp 压缩
    },
    mode: 'production', // 模式： 一种是 production(生产模式) ， 一种是 development（开发模式）
    entry: './src/index.js', // 入口
    output: {
        filename: 'bundle.[hash:8].js', // 打包后的文件名 加上[hash],可以辨别文件更改，也可以防止覆盖 [hash:8]就是生成一个8位的hash戳
        path: path.resolve(__dirname, 'dist'), // 打包后的路径，路径必须时绝对路径
        outputPath: 'http://www.xiaowu.cn' // 打包后为 所有的 js、css、图片，外部引入文件进行加上前缀
    },
    plugins: [ // 数组 放着所有的 webpack 插件
        new HtmlWebpackPlugin ({
            template: './src/index.html', // 引用模板路径
            filename: 'index.html', // 生成的 打包文件名
            minify: { // 最小化，也就是压缩 html文件
                removeAttributeQuotes: true, //移去双引号
                collapseWhitespace: true, // 折叠空行，也就是变成一行
            },
            hash: true, // 引用时使用 hash戳
        }),
        new MiniCssExtractPlugin ({
            filename: 'main.css'
        })
    ],
    module: { // 模块
        rules: [ // 规则： css-loader 是支持 @import这种语法的
            // style-loader 这个是将 css 插入到 head 标签中的
            // loader的特点： 希望单一
            // loader 的用法， 字符串和数组
            // loader 执行顺序：默认是 从右向左执行
            // less-loader 将 less 解析为 css
            // 'postcss-loader' 为 样式添加前缀
            {
                test: /\.js$/,
                // use: ['style-loader', 'css-loader']
                use: {
                    loader: 'babel-loader',
                    options: { // 用 babel-loader 需要将 es6 转为 es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            { // 处理 less 文件
                test: /\.less$/,
                // use: ['style-loader', 'css-loader', 'less-loader']
                // MiniCssExtractPlugin.loader 将该文件抽离出来，写入 main.css
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    }
}