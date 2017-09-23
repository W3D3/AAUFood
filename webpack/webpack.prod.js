const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const commonConfig = require('./webpack.common');

const devConfig = {
    devtool: false,
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    ]
};


module.exports = merge.strategy({
    entry: 'prepend',
    plugins: 'prepend'

})(commonConfig, devConfig);