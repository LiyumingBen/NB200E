const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const Config = {
    buildDir: path.resolve(__dirname, "build"),
};

// 命令行参数解析引擎
const argv = require('minimist')(process.argv.slice(2)).mode;

let performance = argv === 'production' ? {
        hints: "warning",
        maxAssetSize: 300000,
        maxEntrypointSize: 500000,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    } : {};

module.exports = () => {
    return {
        entry: {
            index2: "./index2.js",
            index1: "./index1.js",
        },
        output: {
            filename: "js/[name].[hash].js",
            path: Config.buildDir,
        },
        devServer: {
            contentBase: Config.buildDir,
            host: "0.0.0.0",
            port: 60000
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader", // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }, {
                test: /\.css$/,
                use: [{
                    loader: "style-loader",
                }, {
                    loader: "css-loader",
                }]
            }, {
                test: /\.(gif|png|jpe?g)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: "img/[name].[hash].[ext]",
                        limit: 8192,
                    }
                }]
            }, {
                    test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: "url-loader",
                options: {
                    name: "fonts/[name].[hash].[ext]",
                    limit: 1
                }
            }],
        },
        plugins: [
            new CleanWebpackPlugin([Config.buildDir]),
            new webpack["ProvidePlugin"]({
                $: 'jquery',
                jQuery: 'jquery',
            }),
            new CopyWebpackPlugin(argv === 'production' ?
                [{context: __dirname, from: "lib/**/*"}] :
                [
                    {context: __dirname, from: "lib/**/*"},
                    {context: __dirname, from: "ajax/**/*"}
                ]),
            new HtmlWebpackPlugin({
                template: "index.html",
                filename: "index.html"
            }),
            new webpack["DllReferencePlugin"]({
                context: __dirname,
                manifest: require("./lib/vendors/manifest.vendors1.json"),
            }),
            new webpack["DllReferencePlugin"]({
                context: __dirname,
                manifest: require("./lib/vendors/manifest.vendors2.json"),
            }),
        ],
        performance: performance
    }
};