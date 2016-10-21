'use strict';
let webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let isProd = process.env.NODE_ENV === 'production';

if (!isProd) {

    // In development mode, we use JiT compilation without minification.
    module.exports = {
        entry: {
            'app': './app/main.ts'
        },

        output: {
            path: "./wwwroot/",
            filename: "dist/[name].bundle.js",
            chunkFilename: 'dist/[name].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader',
                        'source-map-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw' // html
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader" // css
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"] // scss
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // Adds script for the bundle in index.html.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'app/index.html'
            })
        ],

        resolve: {
            extensions: ['.ts', '.js', '.html', '.css', '.scss']
        },

        devtool: 'source-map'

    };

} else {

    // In production mode, we use AoT compilation & minification.
    module.exports = {
        entry: {
            'app-aot': './app/main-aot.js'
        },

        output: {
            path: "./wwwroot/",
            filename: "dist/[name].bundle.js",
            chunkFilename: 'dist/[name].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw' // html
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader" // css
                },
                {
                    test: /\.scss$/,
                    loaders: ["style", "css", "sass"] // scss
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // Cleans dist folder.
            new CleanWebpackPlugin(['./wwwroot/dist']),
            // Minimizes the bundle.
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: false
            }),
            // Adds script for the bundle in index.html.
            new HtmlWebpackPlugin({
                filename: 'index.html',
                inject: 'body',
                template: 'app/index.html'
            })
        ],

        resolve: {
            extensions: ['.ts', '.js', '.html', '.css', '.scss']
        },

        devtool: false

    };

}
