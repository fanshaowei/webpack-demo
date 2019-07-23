const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');

const devConfig = {
    mode: 'development',            //开启开发模式
    devtool: 'inline-source-map',   //代码调试定位
    devServer: {                    //模块更改时，自动刷新浏览器，如果不配置HMR,刷新的是整个项目（通常和HMR配合使用）
        contentBase: './dist',      //打包发布路
        hot: true                   //启用HMR模块热替换，这样就不会更新一个模块时，刷新整个项目了
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),   //添加HMR插件
    ],
    output: {
        publicPath: './'             //配合webpack-dev-middleware，加载重新编译好的目标文件到内存
    }
};

module.exports = merge(commonConfig, devConfig);