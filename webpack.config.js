const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: 'Expense App',
            template: path.resolve('./src/index.html')
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                resolve: {
                    extensions: ['.js', '.jsx']
                },
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        publicPath: '/',
        historyApiFallback: true
    }
}