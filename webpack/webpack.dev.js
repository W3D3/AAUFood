const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

const devConfig = {
    output: {
        publicPath: "dist/"
    },        
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new webpack.NamedModulesPlugin()
    ]
};

module.exports = merge.strategy({
    entry: 'prepend',
    plugins: 'prepend'

})(commonConfig, devConfig);