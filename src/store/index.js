import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import account from './account/account'
import daily from './daily/daily'
import causeCentre from './causeCentre/causeCentre'
import customer from './customer/customer'
import documentary from './documentary/documentary'
import arrive from './arrive/arrive'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 添加商品tab栏的显示
    showParams: false,
    showAttr: false,
    showPic: false,
    showContent: false,
    tabList: JSON.parse(localStorage.getItem('tabList')) || [{name: '首页', url: '/'}]
  },
  mutations: {
    pushTabList(state, data) {
      state.tabList.push(data)
    },
    setTabList(state, data) {
      state.tabList = data
    },
  },
  actions: {
  },
  modules: {
    user, //用户
    account,//账户
    daily ,//日志
    causeCentre, //事业
    customer, //客户
    documentary,//跟单
    arrive,//到访
  }
})
//模板
// import Vue from 'vue'
// import api from '../../http/api'
// import router from '../../router'
// import { Message } from 'element-ui'

// export default {
//     // 开启命名空间,这个文件就是单独的一个vuex的模块
//     namespaced: true,
//     state: {

//     },
//     mutations: {

//     },
//     actions: {

//     }
// }
