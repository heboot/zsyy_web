const path = require('path');
const CompressionPlugin = require("compression-webpack-plugin");
const resolve = dir => {
    return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
    js: [
        'https://cdn.bootcss.com/vue/2.6.10/vue.min.js',     //上线后压缩的vue
        // 'https://cdn.bootcss.com/vue/2.6.10/vue.js',            //开发期间未压缩的vue
        'https://cdn.bootcss.com/vue-router/3.0.3/vue-router.min.js',
        // "https://unpkg.com/axios@0.19.0/dist/axios.min.js",
        // "https://cdn.bootcss.com/iview/3.4.2/iview.min.js"
    ]
}
const BASE_URL = process.env.NODE_ENV === 'production' ?
    '/' :
    '/'
module.exports = {
    // baseURL: BASE_URL,
    // tweak internal webpack configuration.
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    chainWebpack: config => {
        config.plugins.delete("prefetch");
        // if (isProduction) {
        config.plugin('html').tap(args => {
            args[0].cdn = cdn;
            return args;
        });
        // }
        config.resolve.alias
            .set('@', resolve('src'))               // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'))
            // .set('bootstrap-components', path.resolve(__dirname, 'node_modules/bootstrap-vue/es/components'));

    },
    configureWebpack: config => {
        // if (isProduction === "production") {
        config.externals = {
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            // "axios": "axios",
            // 'iview': 'iview'
        }
        return {
            plugins: [
                new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/, //匹配文件名
                    threshold: 10240, //对超过10k的数据压缩
                    deleteOriginalAssets: false //不删除源文件
                })
            ]
        }
        // }
    },
    // 打包时不生成.map文件
    productionSourceMap: false,
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        proxy: {
            '/uc': {
                // target: "http://62.234.59.112:6002", //服务器
                target: "http://47.115.32.248:6002", //服务器
            }
        }
    }
}