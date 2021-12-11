const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.posix.join(__dirname, 'src/app.ts'),
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
        global: false
    },
    resolve: {
        extensions: ['.ts'],
        modules: [
            'node_modules',
            path.posix.resolve(__dirname, 'src')
        ],
        alias: {
            '~': path.posix.resolve(__dirname, 'src')
        }
    },
    output: {
        path: path.posix.join(__dirname, 'dist'),
        filename: `ejyy_server.js`
    },
    stats: 'errors-only',
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new copyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '../weights'),
                    to: path.posix.join(__dirname, 'dist/weights')
                }
            ]
        })
    ]
};
