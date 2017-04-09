'use strict';
let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let environment = (process.env.NODE_ENV || "development").trim();

if (environment === "development") {

    // In development mode, we use JiT compilation, with source maps & Hot Module Replacement.
    module.exports = {
        entry: {
            'app': './app/main.ts'
        },

        output: {
            path: path.join(__dirname, 'wwwroot'),
            filename: 'dist/[name].bundle.js',
            chunkFilename: 'dist/[id].chunk.js',
            publicPath: '/'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular-router-loader',
                        'angular2-template-loader',
                        'source-map-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    loaders: [
                       'style-loader',
                       'css-loader',
                       'raw-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    loaders: [
                       'style-loader',
                       'css-loader',
                       'sass-loader'
                    ]
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

        devtool: 'source-map',

        watch: true,

        performance: { hints: false }

    };

} else {

    // In production mode, we use AoT compilation, tree shaking & minification.
    module.exports = {
        entry: {
            'app-aot': './app/main-aot.js'
        },
        // We use long term caching.
        output: {
            path: path.join(__dirname, 'wwwroot'),
            filename: 'dist/[name].[hash].bundle.js',
            chunkFilename: 'dist/[id].[hash].chunk.js'
        },

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: [
                        'awesome-typescript-loader',
                        'angular-router-loader?aot=true&genDir=aot/app'
                    ]
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.css$/,
                    loaders: [
                       'style-loader',
                       'css-loader',
                       'raw-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    loaders: [
                       'style-loader',
                       'css-loader',
                       'sass-loader'
                    ]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // Minimizes the bundle.
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
            modules: [
                'node_modules',
                path.resolve(__dirname, 'app')
            ],
            extensions: ['.ts', '.js', '.html', '.css', '.scss']
        },

        devtool: false,

        performance: { hints: false }

    };

}
