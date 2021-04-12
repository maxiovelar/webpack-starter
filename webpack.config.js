const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



module.exports = {

    mode: 'development',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    module: {
        rules: [
        
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
                test: /\.(ico|png|jpg|jpeg|gif)/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name].[hash].[ext][query]'
                }
            }

        ]
    },
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            ignoreOrder: false
        }),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
    ]

}