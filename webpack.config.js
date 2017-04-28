const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        popup: './popup.js',
        getActiveTab: './getActiveTab.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};