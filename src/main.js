import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './global'
import './filters'
import api from './http/api'
import dayjs from 'dayjs'
import "nprogress/nprogress.css"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import 'animate.css'
import VueIntro from 'vue-introjs'
import 'intro.js/introjs.css'

Vue.prototype.$api = api
// dayjs时间处理
Vue.prototype.$dayjs = dayjs
Vue.config.productionTip = false
//登录页粒子特效
import VueParticles from 'vue-particles'  
Vue.use(VueParticles)  

Vue.use(VueIntro)
Vue.use(mavonEditor)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
