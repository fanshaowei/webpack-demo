const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //自动将入口文件打包到index页面
const {CleanWebpackPlugin} = require('clean-webpack-plugin');//打包前清除dist目录
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    mode: 'development',            //开启开发模式
    entry: {
        app: './src/index.js',
        print: './src/print.js',
        another: './src/another-module.js'
    },
    output: {
        filename: '[name].[hash].js',               //根据#entry配置，生成对应目标文件名字,进行代码分离
        chunkFilename: '[name].[contenthash].js',   //如果在#entry没有配置，但又需要被打包出来（如按需要加载的情况下）的文件
        path: path.resolve(__dirname, 'dist'),      //本地打包输出文件到硬盘目录（为发布用）
        publicPath: './'                     //注意：这是在本地服务器运行时，将打包文件输出到##内存的某个路径下##（默认是web服务器的根目录），HtmlWebpackPlugin自动引用打包好的文件使用的就是这个路径
                                             // 配合webpack-dev-middleware，加载重新编译好的目标文件到##内存##
    },
    devtool: 'inline-source-map',   //代码调试定位
    devServer: {                    //模块更改时，自动刷新浏览器，如果不配置HMR,刷新的是整个项目（通常和HMR配合使用）
        contentBase: './dist',      //打包发布路
        hot: true                   //启用HMR模块热替换，这样就不会更新一个模块时，刷新整个项目了
    },
    plugins: [
        new CleanWebpackPlugin(),   //清空目标目录
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.HashedModuleIdsPlugin(),        //每次编译，会在目标文件的 文件名中加上hash 串
        new webpack.HotModuleReplacementPlugin(),   //添加HMR插件
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',                 //如果一个文件即将被直接引用,那么使用filename的规则
            chunkFilename: '[name].[contenthash].css',      //如果是间接引用CSS内容,那么使用chunkFilename的规则
            ignoreOrder: true
        }),
    ],
    optimization: {                 //代码分离，防止重复引入相同模块 SplitChunksPlugin
        moduleIds: 'hashed',        //让vender文件的hash固定 make the vendor hash to fix
        runtimeChunk: 'single',     //split runtime code into a separate chunk
        splitChunks: {
            chunks: 'all',          //代码分离，去除重复模块引入  initial | all | async
            cacheGroups: {
                commons: {
                    name: "commons", //指定提取的公共的bundle名称
                    chunks: "initial",
                    minChunks: 2
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                //exclude: /node_modules/,
                loader: 'babel-loader',
                options: {//如果有这个设置则不用再添加.babelrc文件进行配置
                    "babelrc": false,// 不采用.babelrc的配置
                    "plugins": [
                        "dynamic-import-webpack"
                    ]
                }
            },
            {
                test: /\.(jpg|png|gif)$/,
                use:{
                    loader: 'url-loader',
                    options:{
                        name: '[name]_[contenthash].[ext]',
                        outputPath: 'images/',
                        limit:2048
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            }
        ]
    }
};