import Vue from 'vue'
import VueRouter from 'vue-router'
//引入路由组件
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
// 使用路由
Vue.use(VueRouter)
//配置路由信息
const routes = [
  { path: "/", redirect: "/goods" },
  { path: "/goods", component: Goods },
  { path: "/ratings", component: Ratings },
  { path: "/seller", component: Seller },
]
//实例化路由
const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: "active",//选中样式active
  // base: process.env.BASE_URL,//全局变量 目前不设置 先注释掉
})

export default router
