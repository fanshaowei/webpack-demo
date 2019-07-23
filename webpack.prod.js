const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: 'production',     //开启开发模式
    devtool: 'source-map',  //代码调试定位
};

module.exports = merge(commonConfig, prodConfig);