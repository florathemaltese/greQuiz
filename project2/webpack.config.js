const path = require('path');
module.exports = {
    mode: 'development',
    entry: './client/index.js',
    devtool: 'source-map',
    devServer: {
        static: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3003',
                router: () => 'http://localhost:3001',
                logLevel: 'debug',
            },
        },
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] },
                },
            },
        ],
    },
};