'use strict';
const path = require('path');
const fs = require('fs');

// 统一路径解析
function resolve(dir) {
  return path.resolve(__dirname, dir);
}

// 包括生产和开发的环境配置信息
module.exports = {
  settings: {
    enableESLint: false, // 调试模式是否开启ESLint，默认开启ESLint检测代码格式
    enableESLintFix: false, // 是否自动修正代码格式，默认不自动修正
    enableStyleLint: false, // 是否开启StyleLint，默认开启ESLint检测代码格式
    enableStyleLintFix: false, // 是否需要StyleLint自动修正代码格式
  },
  webpack: {
    target: ['web', 'es5'], // 指定目标环境为 web 和 es5，确保兼容性
    resolve: {
      // webpack的resolve配置
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.umd.js', '.min.js', '.json'], // 用于配置webpack在尝试过程中用到的后缀列表
      alias: {
        '@': resolve('src'),
        $assets: resolve('src/assets'),
        $public: resolve('public'),
        $utils: resolve('src/utils'),
      },
    },
    // sassResources中的sass文件会自动注入每一个sass文件中
    sassResources: [
      resolve('./src/assets/css/common.scss'),
      resolve('./src/assets/css/mixin.scss'),
    ],
    // createDeclaration: true, // 打包时是否创建ts声明文件
    ignoreNodeModules: false, // 打包时是否忽略 node_modules
    // allowList: [], // ignoreNodeModules为true时生效
    // projectDir: ['src'],
    // template: resolve('./public/template.html'), // 自定义html模板
    // plugins: [],
    // babelPlugins: [],
  },
  // 用于添加 Neo 共享依赖模块的配置信息
  /*
  neoCommonModule: {
    // exports: ['xxModule'], // 数组写法，用于导出当前自定义组件中的第三方依赖模块
    exports: { // 对象写法，可用于导出自定义组件中的某个内容模块（需要使用绝对路径导出）
      'xxModule': path.resolve('./src/components/xxModule'), // 导出 xx组件 或 xx模块
    },
    // remoteDeps: ['xxCmpType'], // 远程依赖组件，表示当前自定义组件会用到的依赖组件，需要和 externals 配合使用
    // externals: ['xxModule'], // 自定义组件中需要剔除的模块，仅支持数组写法
  },
  */
  preview: {
    // 用于开启本地预览模式的相关配置信息
    /*
    【特别说明】以下配置项都自带默认值，非必填。如需自定义请自行配置。
    entry: { // 根据 src/components 目录下的文件自动生成 entry 相关配置
      // 本地预览自定义组件内容
      index: './src/preview.jsx',
    },
    NODE_ENV: 'development',
    port: 80, // 设置基础端口，如果被占用则自动寻找可用端口
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    proxyTable: {
      '/apiTest': {
        target: 'http://api-test.com.cn', // 不支持跨域的接口根地址
        ws: true,
        changeOrigin: true,
      },
    },
    */
  },
  linkDebug: {
    // 用于开启本地调试模式的相关配置信息
    /*
    【特别说明】以下配置项都自带默认值，非必填。如需自定义请自行配置。
    entry: { // 根据 src/components 目录下的文件自动生成 entry 相关配置
      // 外链调试（在线上页面设计器端预览自定义组件）
      index: [
        './src/components/xxCmp/register.ts',
        './src/components/xxCmp/model.ts',
      ],
    },
    NODE_ENV: 'development',
    port: 80, // 设置基础端口，如果被占用则自动寻找可用端口
    closeHotReload: true, // 是否关闭热更新
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '',
    hostname: 'localhost',
    proxyTable: {
      '/apiTest': {
        target: 'http://api-test.com.cn', // 不支持跨域的接口根地址
        ws: true,
        changeOrigin: true,
      },
    }
    */
  },
  // 选择「自定义环境」时需要添加 NeoCRM 平台配置，可自定义对接的任何环境
  neoConfig: {
    // authType: 'oauth2', // 默认授权模式：OAuth2 授权码模式
    neoBaseURL: 'https://crm-test.xiaoshouyi.com', // 平台根地址（默认：https://crm.xiaoshouyi.com）
    loginURL: 'https://login-test.xiaoshouyi.com/auc/oauth2/auth', // 登录授权 URL（默认：https://login.xiaoshouyi.com/auc/oauth2/auth）
    tokenURL: 'https://login-test.xiaoshouyi.com/auc/oauth2/token', // Token 获取接口地址（默认：https://login.xiaoshouyi.com/auc/oauth2/token）
  },
  pushCmp: {
    // 用于构建并发布至 NeoCRM 的相关配置
    /*
    【特别说明】以下配置项都自带默认值，非必填。如需自定义请自行配置。
    NODE_ENV: 'production',
    entry: { // 根据 src/components 目录下的文件自动生成 entry 相关配置
      InfoCardModel: './src/components/xxCmp/model.ts',
      infoCard: './src/components/xxCmp/register.ts'
    },
    cssExtract: false, // 不额外提取css文件
    assetsRoot: resolve('dist') // 上传指定目录下的脚本文件
    */
  },
  build2lib: {
    entry: {
      targetNumber: './src/components/targetNumber__c/index.tsx',
      customStyleConfig: './src/components/targetNumber__c/customStyleConfig',
    },
    output: {
      filename: '[name].js',
    },
    removeNeoCommonModules: true, // 是否移除 Neo 共享的依赖模块，默认不移除
    NODE_ENV: 'production', // development、production
    libraryName: 'NeoBIComponent', // 构建第三方功能包时最后导出的引用变量名
    assetsRoot: resolve('./lib'), // 打包后的文件绝对路径（物理路径）
    assetsPublicPath: '/', // 设置静态资源的引用路径（根域名+路径）
    assetsSubDirectory: '', // 资源引用二级路径
    ignoreNodeModules: false,
    // allowList: ['@babel/runtime', '@babel/runtime/helpers/inheritsLoose'],
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    bundleAnalyzerReport: false,
  },
};
