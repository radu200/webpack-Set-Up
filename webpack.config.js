  var path = require("path");
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  const ExtractTextPlugin = require("extract-text-webpack-plugin");


  module.exports = {
    entry: {
      app: ["./src/app.js"]
    },
    output: {
      path: path.resolve(__dirname, "dist"),
       //publicPath: "/assets/",
      filename: "bundle.js"
    },
    module: {
        rules: [
            { test: /\.scss$/,
               use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader",'postcss-loader',"sass-loader",],
            publicPath: "/dist"
       })
     },
     { test: /\.js$/,
       exclude: /node_modules/,
       use: "babel-loader" },
       {
         test:/\html$/,
         use:['html-loader']
       },
       {
         test:/\.(jpg|png)$/,
         use:[
           {
             loader:'file-loader',
             options:{
               name:'[name].[ext]',
               outputPath:'img/',
               publicPath:'img/'
             }
           }
         ]

       }

    ]
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },

    plugins: [
      new HtmlWebpackPlugin({
          title: 'webpack project',
          template: './src/index.html',
      }),

   new ExtractTextPlugin({
     filename: "style.css",
    disable: false,
    allChunks: true
   }),

 ]
};
