const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //代理跨域
  devServer: {
    port:8090,
    open:true,
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {
        //   "/api": "", 把带有/api的转换成空串
        // },
        //changeOrigin:true 用于控制请求头中的host值
      },
    },
  },
 });

8