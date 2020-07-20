const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 清除资源文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin') // 拷贝资源文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 提取CSS
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // 压缩CSS
const TerserWebpackPlugin = require('terser-webpack-plugin') // 压缩JS

/**
 *
 * @param env 通过CLI传递的环境名参数
 * @param argv 运行CLI时所传递的所有参数
 */
module.exports = (env, argv) => {
  const config = {
    mode: 'none',
    entry: './src/main.js',
    output: {
      filename: 'bundler.[hash:8].js', // hash, chunkhash, contenthash
      path: path.join(__dirname, 'dist'),
      // publicPath: 'dist/'
    },
    devServer: {
      // hot: true,
      hotOnly: true,
      contentBase: ['./public'],
      proxy: {
        '/api': {
          // http://localhost:8080/api/users -> https://api.github.com/api/users
          target: 'https://api.github.com',
          // http://localhost:8080/api/users -> https://api.github.com/users
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      }
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /.png$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024
            }
          }
        }
      ]
    },
    plugins: [
      // 为代码注入全局成员，可以为我们的代码来注入可能会发生变化的值
      new webpack.DefinePlugin({
        API_BASE_URL: '"http://api.example.com"' // 或 API_BASE_URL: JSON.stringfy('http://api.example.com')
      }),
      // 用于生成 index.html
      new HtmlWebpackPlugin({
        title: 'Webpack Plugin Sample',
        meta: {
          viewport: 'width-device-width'
        },
        template: './src/index.html'
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  }

  if (env === 'production') {
    config.mode = 'production'
    config.devtool = false
    config.optimization = {
      minimizer: [
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin()
      ]
    }
    config.plugins = [
      ...config.plugins,
      new CleanWebpackPlugin(),
      // 开发阶段最好不要使用这个插件（打包时使用）
      new CopyWebpackPlugin(['public']),
      new MiniCssExtractPlugin()
    ]
  }

  return config
}
