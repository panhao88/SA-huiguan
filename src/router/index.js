import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Content from '../views/common/Content'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '',
    name: '',
    component: Content,
    meta: {
      path: '',
      title: '首页',
      // enTitle: 'dashboard',
      icon: 'el-icon-s-home'
    },
    children: [
      {
        name: '',
        component: Home,
        path: '/',
        meta: {
          path: '/Home',
          title: '首页',
          enTitle: 'dashboard',
          icon: 'el-icon-s-home'
        }
      },
    ]
  },
  {
    path: '',
    component: Content,
    meta: {
      title: '权限控制',
      icon: 'el-icon-unlock'
    },
    children: [
      {
        path: '/permissions/api/permissions/getAllMenu',
        component: () => import('../views/rights/Rights.vue'),
        meta: {
          title: '权限菜单',
          enTitle: 'rights',
          icon: 'el-icon-magic-stick',
        }
      },
      {
        path: '/permissions/api/account/getList',
        component: () => import('../views/rights/Account.vue'),
        meta: {
          title: '账户列表',
          icon: 'el-icon-info',
        }
      },
      {
        path: '/permissions/api/role/getList',
        component: () => import('../views/rights/Rolelist.vue'),
        meta: {
          title: '角色列表',
          enTitle: 'rolelist',
          icon: 'el-icon-key',
        }
      }
    ]
  },
  {
    path: '',
    name: '',
    component: Content,
    meta: {
      title: '客户管理',
      icon: 'el-icon-s-home'
    },
    // /customer/source
    children: [
      {
        name: '',
        path: '/customer/api/customer/getList',
        component: () => import ('../views/userlist/Userlist'),
        meta: {
          path: '/Home',
          title: '客户列表',
          icon: 'el-icon-s-home'
        }
      },
    ]
  },
  {
    path: '',
    name: '',
    component: Content,
    meta: {
      title: '系统设置',
      icon: 'el-icon-s-home'
    },
    // /customer/source
    children: [
      {
        name: '',
        path: '/setting/customer/set',
        component: () => import ('../views/userlist/Set'),
        meta: {
          path: '/Home',
          title: '系统设置',
          icon: 'el-icon-s-home'
        }
      },
    ]
  },
  {
    path: '',
    component: Content,
    meta: {
      title: '日志管理',
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/log/api/log/loginLogList',
        component: () => import('../views/thelog/Logontolog.vue'),
        meta: {
          title: '登录日志',
          icon: 'el-icon-tickets',
        }
      },
      {
        path: '/log/api/log/operationList',
        component: () => import('../views/thelog/Manipulalog.vue'),
        meta: {
          title: '操作日志',
          icon: 'el-icon-tickets',
        }
      }
    ]
  },
  {
    path: "",
    component: Content,
    meta: {
      title: '到访管理',
      icon: 'el-icon-user',
    },
    children: [
      {
        path: '/arrive/api/arrive/getList',
        component: () => import('../views/arrive/Arrive.vue'),
        meta: {
          title: '到访列表',
          icon: 'el-icon-info',
        }
      }
    ]
  },
  {
    path: "",
    component: Content,
    meta: {
      title: '跟单管理',
      icon: 'el-icon-user',
    },
    children: [
      {
        path: '/merchandis/api/merchandis/getList',
        component: () => import('../views/merchandis/Merchandis.vue'),
        meta: {
          title: '跟单列表',
          icon: 'el-icon-info',
        }
      }
    ]
  },
  // 登录
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login')
  },
  {
    path: '*',
    meta: {
      title: '错误页面'
    },
    component: () => import('../views/err/404.vue')
  },
]

const isPro = process.env.NODE_ENV === 'production'

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let user = localStorage.getItem('adminUser')
  if (to.path === '/login') {
    next()
  } else {
    user ? next() : next('/login')
  }
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default router

