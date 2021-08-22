import Vue from 'vue'
import Vuex from 'vuex'

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
   
  }
})