const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: {
        index: './src/index.ts',
        'service-worker': './service-worker/service-worker.ts'
    },
    output: {
        filename: './[name].js',
        assetModuleFilename: '[name][ext]',
        clean: true
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            // Specify the tsconfig.json to use as depending on the entry
            // order, the first config is used for the rest of the .ts files.
            options: {
                configFile: 'service-worker/tsconfig.json'
            },
            exclude: [/node_modules/, /src/]
        }, {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                configFile: 'src/tsconfig.json'
            },
            exclude: [/node_modules/, /service-worker/]
        }, {
            test: /\.(png|svg|jpg|jpeg|gif|webmanifest)$/i,
            type: 'asset/resource',
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            filename: 'index.html',
            inject: false,
            minify: true
        })
    ],
    devServer: {
        hot: false,
        liveReload: false,
        webSocketServer: false
    }
};