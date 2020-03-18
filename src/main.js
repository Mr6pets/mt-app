import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//用到的模块都挂载到APP这个实例上
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
