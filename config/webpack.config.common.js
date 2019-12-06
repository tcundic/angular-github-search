'use strict';

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        vendor: './src/vendor.ts',
        polyfills: './src/polyfills.ts',
        main: isDev ? './src/main.ts' : './src/main.aot.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: path.resolve('src', 'assets')
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'to-string-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: path.resolve('src', 'app')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg|json|ico)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: 'url-loader?limit=100000',
                        options: {
                            esModule: false,
                        },
                    }
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new HtmlWebpackPlugin({
            template: 'src/index.html',
            favicon: './src/assets/images/logo.ico'
        })
    ]
};