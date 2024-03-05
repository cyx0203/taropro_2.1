const path = require('path');
const config = {
  projectName: 'geit_demo_v6',
  date: '2022-1-24',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  alias:{
    '@/GGCore': path.resolve(__dirname, '..', 'src/core'),
    '@/GGJs': path.resolve(__dirname, '..', 'src/js'),
    '@/GGH5': path.resolve(__dirname, '..', 'src/h5'),
    "@/GGCompLib": path.resolve(__dirname, '..', 'src/h5/ggcomplib/index'),
    "@/GGCompLibBase": path.resolve(__dirname, '..', 'src/h5/ggcomplib/core/base'),
    "@/GGPageRoot": path.resolve(__dirname, '..', 'src/h5/core/root'),
    "@/GGCPS": path.resolve(__dirname, '..', 'src/h5/components/IHCPS/index')
  },
  //Editor:woo
  //Description:向全局注入该样式文件
  sass: {
    resource: path.resolve(__dirname, '..', 'src/h5/styles/global.scss'),
  },
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          //[Edit Info]2023-01-09 Woo
          //此处是用来开启样式模块化的核心配置
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
