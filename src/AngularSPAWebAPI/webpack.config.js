'use strict';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ngToolsWebpack = require('@ngtools/webpack');

const environment = (process.env.NODE_ENV || "development").trim();

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
                    use: [
                        'awesome-typescript-loader',
                        'angular-router-loader',
                        'angular2-template-loader',
                        'source-map-loader'
                    ]
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'app/styles'),
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: path.join(__dirname, 'app/styles'),
                    use: [
                        'raw-loader',
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
            extensions: ['.ts', '.js']
        },

        devtool: 'source-map',

        watch: true,

        performance: { hints: false }

    };

} else {

    // In production mode, we use AoT compilation, tree shaking & minification.
    module.exports = {
        entry: {
            'app-aot': './app/main-aot.ts'
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
                    use: '@ngtools/webpack'
                },
                {
                    test: /\.html$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'app/styles'),
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: path.join(__dirname, 'app/styles'),
                    use: [
                        'raw-loader',
                        'sass-loader'
                    ]
                }
            ],
            exprContextCritical: false
        },

        plugins: [
            // AoT plugin.
            new ngToolsWebpack.AotPlugin({
                tsConfigPath: './tsconfig-aot.json'
            }),
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
            extensions: ['.ts', '.js']
        },

        devtool: false,

        performance: { hints: false }

    };

}
