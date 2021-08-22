import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '',
    component: layout,
    meta: {
      path: '/home',
      title: '首页',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        name: 'home',
        component: Home,
        path: '/home',
        meta: {
          path: '/home',
          title: '首页',
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/orders',
    component: layout,
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-order',
    },
    children: [
      {
        path: 'petorders',
        name: 'petorders',
        component: () => import('../views/orders/petorders.vue'),
        meta: {
          title: '订单列表',
          icon: 'el-icon-folder-add',
          path: '/orders/petorders'
        }
      },
      {
        path: 'ordershopp',
        name: 'Ordershopp',
        component: () => import('../views/orders/Ordershopp.vue'),
        meta: {
          title: '订单商城',
          icon: 'el-icon-folder-add',
          path: '/orders/ordershopp'
        }
      }
    ]
  },
  {
    path: '/user',
    component: layout,
    meta: {
      title: '用户管理',
      icon: 'el-icon-s-order',
    },
    children: [
      {
        path: 'Userstration',
        name: 'Userstration',
        component: () => import('../views/user/Userstration.vue'),
        meta: {
          title: '用户列表',
          icon: 'el-icon-folder-add',
          path: '/orders/orders'
        }
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   let adminUser = JSON.parse(localStorage.getItem('adminUser'))
//   if (to.path === '/Sign') next()
//   else adminUser ? next() : next('/Sign')
// })
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err);
// };
export default router