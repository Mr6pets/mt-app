// vue.config.js
// mock数据

//请求data文件下的goods.json等文件
const goods = require("./data/goods.json");
const ratings = require("./data/ratings.json");
const seller = require("./data/seller.json");

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',//公共路径，这样打包的文件前面的/就不用手动删除了
  // baseUrl: '/',//根路径
  outputDir: 'dist',//构建输出路径
  assetsDir: 'assets',//静态资源输出目录（js,css,img,fonts）
  lintOnSave: false,//是否开启eslint保存检测，有效值：true || false || 'error'
  // filenamehashing: true,//打包的文件js css 会有随机的一个哈希值
  //反向代理
  devServer: {
    open: true,//true 启动项目后自动打开本地网页 false 不会自动打开在线页面
    // host: 'localhost',//本地开发主机名用localhost或者是127.0.0.0 真机测试用0.0.0.0
    // port: 8080,//默认端口号8080 
    host: "0.0.0.0",//真机测试地址修改
    port: 8080,//真机测试端口号
    https: false,//true: https://localhost:8081启动 false :http://localhost:8081
    hotOnly: false,//热更新
    proxy: {//配置跨域，解决跨域问题
      //配置跨域
      '/api': {//以"/api"开头的代理到下面的target属性的值中去
        // target: 'http://localhost:5000/api/',
        // target: 'http://47.99.100.141/api/',
        target: 'http://www.gulueater.com/api/',
        ws: true,//询问是否跨域 true跨域 false 不跨域
        changOrigin: true,
        pathRewrite: {//路径重写 
          '^/api': ''//这个意思是以api开头的，定向到哪里，如果后面还有路径的话，会自动拼接上
        }
      }
    },
    before(app) {
      //http://localhost:8080/api/goods
      app.get('/api/goods', (req, res) => {
        res.json(goods);
      });
      //http://localhost:8080/api/ratings
      app.get('/api/ratings', (req, res) => {
        res.json(ratings);
      });
      //http://localhost:8080/api/seller
      app.get('/api/seller', (req, res) => {
        res.json(seller);
      });
    }
  }
}



