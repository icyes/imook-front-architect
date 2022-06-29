/**
 * @description webpack dev config
 * @author 双越
 */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'main.[contenthash:8].js', // 打包代码时，加上 hash 戳
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        // css 文件加 hash
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
})
