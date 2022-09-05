import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'desktop',
        component: () => import(/* webpackChunkName: "about" */ '../views/Deskstop.vue'),
      },
      {
        path: '/departmentList',
        name: 'departmentList',
        component: () => import(/* webpackChunkName: "about" */ '../views/system/Department/DepartmentList.vue'),
      },
      {
        path: '/menuList',
        name: 'menuList',
        component: () => import(/* webpackChunkName: "about" */ '../views/system/Menu/MenuList.vue'),
      },
      {
        path: '/roleList',
        name: 'roleList',
        component: () => import(/* webpackChunkName: "about" */ '../views/system/Role/RoleList.vue'),
      }, 
      // 爬虫管理路由
      {
        path:'/reptile',
        name:'reptile',
        component: () => import(/* webpackChunkName: "about" */ '../views/Reptile/Reptile.vue'),
      },
      // 标讯管理路由
      {
        path:'/message',
        name:'message',
        component: () => import(/* webpackChunkName: "about" */ '../views/Message/Message.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ '../views/User/UserList.vue'),
      },
      {
        path: '/oder',
        name: 'oder',
        component: () => import(/* webpackChunkName: "about" */ '../views/Oder/Oder.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
