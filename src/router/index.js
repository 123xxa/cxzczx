import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:"index",
    component: () => import(/* webpackChunkName: "about" */ '@/views/tabbar/index.vue'),
    redirect:"home",
    children:[
      {
        path:"home",
        name:"home",
        component:()=>import(/* webpackChunkName: "home" */ '@/views/tabbar/home/index.vue')
      },
      {
        path:"market",
        name:"market",
        component:()=>import(/* webpackChunkName: "home" */ '@/views/tabbar/market/index.vue')
      },
      {
        path:"trade",
        name:"trade",
        component:()=>import(/* webpackChunkName: "home" */ '@/views/tabbar/trade/index.vue')
      },
      {
        path:"lever",
        name:"lever",
        component:()=>import(/* webpackChunkName: "home" */ '@/views/tabbar/lever/index.vue')
      },
      {
        path:"mine",
        name:"mine",
        component:()=>import(/* webpackChunkName: "home" */ '@/views/tabbar/mine/index.vue')
      }
    ]
  },
  {
    path:"/recharge",
    name:"recharge",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/recharge/index.vue')
  },
  {
    path:"/register",
    name:"register",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/register/index.vue')
  },
  {
    path:"/login",
    name:"login",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/login/index.vue')
  },
  {
    path:"/forgetPwd",
    name:"forgetPwd",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/forgetPwd/forgetPwd.vue')
  },
  {
    path:"/forgetPwdNext",
    name:"forgetPwdNext",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/forgetPwd/forgetPwdNext.vue')
  },
  {
    path:"/depositCoins",
    name:"depositCoins",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/depositCoins/index.vue')
  },
  {
    path:"/withdrawCoins",
    name:"withdrawCoins",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/withdrawCoins/index.vue')
  },
  {
    path:"/transfer",
    name:"transfer",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/transfer/index.vue')
  },
  {
    path:"/withdrawal",
    name:"withdrawal",
    component:()=>import(/* webpackChunkName: "home" */ '@/views/withdrawal/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
