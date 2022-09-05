import Vue from 'vue'
import ElementUI from 'element-ui'; //引入element组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入element样式文件
import './assets/css/flex.css';
import App from './App.vue'
import router from './router'
import store from './store'
import JsonViewer from 'vue-json-viewer'

Vue.config.productionTip = false
Vue.use(ElementUI); //使用element

import axios from 'axios'
Vue.prototype.$http = axios;
//axios拦截器，发送请求之前操作

// 进入路由之前
router.beforeEach((to, from, next) => {
  // to 将要进入的路由， from 将要离开的路由 ， next 让路由继续
  // 获取当前打开的选项卡
  store.commit('getTabs');
  // 激活当前的选项卡
  store.commit('setActiveTabs', to.name);
  let token = sessionStorage.getItem('token');
  console.log(to.path);
  if (to.path === '/login') {
    if (token) {
      next({ path: '/home' })
    } else {
      next();
    }
  } else {
    if (!token && to.name !== 'login') {
      next({ path: '/login' })
    } else {
      // token 和 path 都有的情况下该做的，判断路径
      // if (store.state.MenuStore.menu_data.length == 0) {
        // store.commit('getMenuList', router);
        // if (to.path == "/home") {
        //   next({ path: '/home' })
        // } else {
        //  if(to.path) {

        //  }
        // }
      // } else {
        next();
      // }
    }
  }
})
new Vue({
  router,
  store,
  JsonViewer,
  render: h => h(App)
}).$mount('#app')
