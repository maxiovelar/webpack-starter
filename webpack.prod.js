const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {

    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'main.[contenthash].js',
        clean: true,
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {

                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                }

            },
        
            {

                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]

            },

            {

                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader'
                ]

            },

            {

                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    minimize: false
                },

            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new CopyPlugin({
            patterns: [
            { from: 'src/assets', to: 'assets/' },
            ]
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new TerserPlugin(),
    ]

}