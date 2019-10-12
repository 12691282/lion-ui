// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import store from './store'
import config from '@/config'
import ajax from '@/config/ajax'

import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false

//注册全局配置
Vue.prototype.$config = config


// 将AJAX方法绑定到全局
Vue.prototype.$ajax = ajax

Vue.use(ViewUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
