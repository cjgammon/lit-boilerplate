const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Sass = require('sass');

module.exports = (env, argv)=>({
    mode: 'development',//production
    entry: {
        app: './src/index.ts'
    },
    devServer: {
        port: 9000,
        host: 'localhost',
        historyApiFallback: true
    },
    performance : {
        hints : false
    },     
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            cache: false
        }),
        new CopyWebpackPlugin({
             patterns: [
                //{ from: "src/assets/", to: "assets/" },
                { from: "src/styles.css", to: "styles.css" },
            ],
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"}, 
                    {loader: "css-loader", options: {
                        exportType: 'string'
                    }},
                    {loader: 'lit-css-loader'}
                ]
            },
            {
                test: /\.scss$/,
                loader: 'lit-css-loader',
                options: {
                  transform: (data, { filePath }) =>
                    Sass.renderSync({ data, file: filePath })
                      .css.toString(),
                }
            },
            {
                test: /\.(png|gif|jpg|cur)$/i, 
                loader: 'url-loader', options: {limit: 8192}},
            {
                test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: {limit: 10000, mimetype: 'application/font-woff2'}
            },
            {
                test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
                loader: 'url-loader',
                options: {limit: 10000, mimetype: 'application/font-woff'}
            },
            {
                test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, 
                loader: 'file-loader'
            },
            {
                test: /\.(vert|frag|txt)$/i,
                use: 'raw-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}) ;