const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    //Bundling to dist
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    
    mode: 'development',
    
    //Loaders
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.html$/,
            use: {
              loader: 'html-loader'
            }
          },
          {
            test: /\.scss$/,
            use: [
                "style-loader", // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
          }
        ]
      },

      plugins: [
          new htmlWebpackPlugin({
              template: "./src/index.html",
              filename: "./index.html"
          })
      ],

      //webpack-dev-server
      devServer: {
          port: 3000
      }
};