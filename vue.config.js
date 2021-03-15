
const autoprefixer = require('autoprefixer') // 这个依赖不用安装
const pxtorem = require('postcss-pxtorem')
module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 100, // 根字体大小，如果设计图是750的话 记得除2
            unitPrecision: 5,
            propList: ['*'], // 作用在哪些属性上 我这里用的是通配符
            replace: true,
            mediaQuery: false,
            minPixelValue: 0,
            exclude: /node_modules/i
          })
        ]
      }
    }
  }

}
