const path = require('path');
const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProd = process.env.NODE_ENV === "production"

const extractCss = new ExtractTextPlugin({
    filename: "app.css",
    disable: !isProd
});

//Settings
const relativeSrcPath = "../public"; //where to find the code files
const buildPath = "public/dist"; //where to put the output files
const publicPath = "dist/"; //What to prepend to file urls

module.exports = {
    entry: ["./public/scripts.js"],
    output: {
        path: path.resolve(__dirname, '..', buildPath),
        filename: "app.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", "*"],
        modules: [path.resolve(__dirname, relativeSrcPath), "node_modules"]
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules|bower_components/,
            loader: "babel-loader",
            options: {
                cacheDirectory: true
            },
        }, {
            test: /\.css$/,
            use: extractCss.extract({
                fallback: "style-loader",
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }]
            })
        },
        {
            test: /\.scss$/,
            use: extractCss.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }],
                fallback: "style-loader"
            })
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        }
        ]
    },
    plugins: [
        extractCss,
        // new HtmlWebpackPlugin({
        //     title: globalConfig.siteTitle,
        //     template: 'src/index.ejs',
        //     baseHref: globalConfig.getBaseHref()
        // }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ["popper.js", "default"],
            Util: 'exports-loader?Util!bootstrap/js/dist/util',
            Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
        })
    ]
};