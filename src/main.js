// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import store from './store'
import config from '@/config'

import 'iview/dist/styles/iview.css';



Vue.config.productionTip = false

//注册全局配置
Vue.prototype.$config = config

Vue.use(iView)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
