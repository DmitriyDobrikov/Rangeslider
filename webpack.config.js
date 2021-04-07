const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/plagin.ts'),
    },

    devtool: 'inline-source-map',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'webpack Boilerplate',
            template: path.resolve(__dirname, './src/template.pug'), // шаблон
            filename: 'index.html', // название выходного файла
        }),

        new CleanWebpackPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        }),


        new miniCss({
            filename: 'style.css',
         }),
        
    ],



    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                use: [
                    {
                      loader: 'file-loader',
                      options: {
                        outputPath: 'images',
                        name: '[name].[ext]',
                      },
                    },
                  ],
            },

            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },


            {
                test:/\.(s*)css$/,
                use: [
                   miniCss.loader,
                   'css-loader',
                   'sass-loader',
                ]
             },

            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ],
    }

    
}




// module.exports = {
//   entry: './src/index.ts',
//   devtool: 'inline-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.tsx', '.ts', '.js'],
//   },
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
// };