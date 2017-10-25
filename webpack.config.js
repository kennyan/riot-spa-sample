var webpack = require('webpack');

// postcss plugins
var cssimport = require('postcss-import');
var customProperties = require('postcss-custom-properties');
var autoprefixer = require('autoprefixer');
var csswring = require('csswring');
var cssnested = require('postcss-nested');

// strip plugins
var webpackStrip = require('strip-loader');

// env args (gulp build --env production or development)
var argv = require('minimist')(process.argv.slice(2), {
  string: 'env',
  default: { env: 'development' }
})

var debugs = (argv.env === 'production') ? ('debug','console.log') : ('dummy')

 module.exports = {
  entry: {
    app : [ __dirname + '/src/index.js'],
    vendor: [
      "jquery",
      "superagent",
      "bootstrap",
      "masonry-layout",
      "imagesloaded",
      "lodash",
      "jquery-infinite-scroll-helper",
      "riot-i18n",
      "bootbox",
      "riot-route",
      "es-cookie",
    ]
  },
  node: {
    fs: "empty"
  },
  output: {
    path: __dirname + '/www/dist/js/',
    filename: 'app.bundle.js'
  },
  devtool: 'eval',
  debug: true,
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot',
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      request: "superagent",
      Masonry: "masonry-layout",
      imagesLoaded: "imagesloaded",
      _: "lodash",
      bootbox: "bootbox",
      route: "riot-route",
      Cookies: "es-cookie",
      i18n: "riot-i18n",
    }),
    // comcat
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    // minify
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false,drop_console: true}})

  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'es6' } }
    ],
    loaders: [
      { test: /\.js|\.tag$/, exclude: /node_modules/, include: /src/,
        loader: 'babel-loader', query: {presets: ['es2015']}
      },
      { test: /\.js|\.tag$/, loader: webpackStrip.loader(debugs) },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' },
      { test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  postcss: [cssimport, cssnested, customProperties, autoprefixer, csswring],
  devServer: {
    contentBase: './www/',
    port: 1337,
    hot: true,
    inline: true
  }
};
