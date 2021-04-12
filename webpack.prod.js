const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name].[hash].[ext][query]'
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
                test: /\.(ico|png|svg|jpg|jpeg|gif)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[hash].[ext][query]'
                }
            }

        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new TerserPlugin(),
    ]

}