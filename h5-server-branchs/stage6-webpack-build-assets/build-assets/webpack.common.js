/**
 * @description webpack common config
 * @author 双越
 */

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { srcPath, distPath } = require('./constants')

module.exports = {
    entry: path.join(srcPath, 'index'),
    output: {
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: srcPath,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                ],

                // 注意，webpack5 对于 use 和 loader 的使用做了规范：单个使用 loader ，多个使用 use
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyPlugin({
            patterns: [
                // 拷贝 favicon.ico
                {
                    from: path.join(srcPath, 'favicon.ico'),
                    to: path.join(distPath, 'favicon.ico'),
                },
            ],
        }),
    ],
}
