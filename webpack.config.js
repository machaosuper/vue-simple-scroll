var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var appData = require('./data.json');
var imgListData = appData.imgList;
var bodyParser = require('body-parser');
var timer = null;
module.exports = {
  entry: './demo/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader?indentedSyntax'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ],
            'sass': [
              'vue-style-loader',
              'css-loader',
              'sass-loader?indentedSyntax'
            ]
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'vue-simple-scroll': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    before (app) {
      app.use(bodyParser.json({limit: '1mb'}));
      app.use(bodyParser.urlencoded({
        extended: true
      }));
      app.post('/api/imgList', function(req, res) {
        // console.log(req.body);
        var imageListData = imgListData;
        var type = req.body.type || 0;
        var pageSize = +req.body.pageSize || 10;
        var pageNo = +req.body.pageNo || 0;
        var count = pageSize * pageNo;
        if (+type) {
          var imgListArr = [];
          imageListData.forEach((val) => {
            if (val.type == type) {
              imgListArr.push(val);
            }
          });
          var imageListData = imgListArr;
        }
        var imgList = imageListData.slice(count, count + pageSize);
        var isLast = imageListData.slice(count + pageSize + 1).length === 0;
        clearTimeout(timer);
        timer = setTimeout(function () {
          res.json({
            code: '000000',
            data: {
              imgList: imgList,
              isLast: isLast,
              total: imageListData.length
            }
          });  
        }, 1000);
      });
    }
    // proxy: {
    //   '/api': {
    //     target: 'http://172.16.107.90:8000',
    //     changeOrigin: true
    //   }
    // }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
  if (process.env.NODE_ENV === 'production' && process.env.BUILD === 'doc') {
    module.exports.plugins = (module.exports.plugins || []).concat([new HtmlWebpackPlugin()])
  }
  if (process.env.BUILD == 'publish') {
    module.exports.entry = './src/index.js';
    module.exports.output = {
      path: path.resolve(__dirname, './libs'),
      filename: 'vue-simple-scroll.min.js',
      library: 'vueSimpleScroll',
      libraryTarget: 'umd',
      umdNamedDefine: true
    };

    module.exports.resolve = {
      alias: {
        'vue$': 'vue/dist/vue.common.js'
      }
    };

    // Banner
    var moment = require('moment');
    var pkg = require('./package.json');
    var banner = 'Vue Simple Scroll \nversion: ' + pkg.version + ' \nrepo: https://github.com/machaosuper/vue-simple-scroll \nbuild: ' + moment().format('YYYY-MM-DD HH:mm:ss')
    module.exports.plugins.push(
      new webpack.BannerPlugin({ 
        banner: banner,
        entryOnly: true 
      })
    );
  }
}
