import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
import Article from '@/views/Article'
import Image from '@/views/Image'
import Publish from '@/views/publish'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/image',
        name: 'Image',
        component: Image
      },
      {
        path: '/publish',
        name: 'Publish',
        component: Publish
      }
    ]
  }

  // {
  // path: '/',
  // name: 'Home',
  // component: Home
  // },
  // {
  // path: '/about',
  // name: 'About',
  // // route level code-splitting
  // // this generates a separate chunk (about.[hash].js) for this route
  // // which is lazy-loaded when the route is visited.
  // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由拦击
router.beforeEach((to, from, next) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 判断是否是login登录页
  if (to.path !== '/login') {
    // 判断本地存储user是否存在
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    // 放行login
    next()
  }
})

export default router
