import Vue from 'vue'
import ElementUI from 'element-ui'; //引入element组件库
import 'element-ui/lib/theme-chalk/index.css'; //引入element样式文件
import './assets/css/flex.css';
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI); //使用element

// 进入路由之前
router.beforeEach((to,from,next) => {
  // to 将要进入的路由， from 将要离开的路由 ， next 让路由继续
  // 获取当前打开的选项卡
  store.commit('getTabs');
  // 激活当前的选项卡
  store.commit('setActiveTabs',to.name);
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
            