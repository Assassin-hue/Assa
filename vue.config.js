const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer:{
    open:true,
    port:8081,
    proxy:{
        "/api":{
            // target:"http://localhost:8089/api",
            // target:" https://mock.mengxuegu.com/mock/62eb7f32c829935bc76c19ce/system",
            target:"https://bid-test.xinzhimap.com/api",
            // target:"http://192.168.3.251:9250/api",
            changeOrigin:true,
            pathRewrite:{
                '^/api':''
            }
        },
    }
}
}
