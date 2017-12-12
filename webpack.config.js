const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractSass = new ExtractTextPlugin('css/main.css');

module.exports = {
    entry: [
      './src/scss/main.scss',
      'whatwg-fetch',
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js')
    ],

    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: ['react-hot-loader', 'babel-loader'] },
            {
              test: /\.(sass|scss)$/,
                use: extractSass.extract(['css-loader', 'sass-loader'])
            },
            { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
            { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
            { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
            { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
            { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' }
        ]
    },
    plugins: [
        extractSass
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true
    }

};