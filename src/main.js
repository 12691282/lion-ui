// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import store from './store'
import config from '@/config'
import ajax from '@/config/ajax'
import XEUtils from 'xe-utils'
import VXEUtils from 'vxe-utils'
import Cookie from 'js-cookie'


import 'view-design/dist/styles/iview.css';


Vue.config.productionTip = false

//注册全局配置
Vue.prototype.$config = config

//注册全局cookie
Vue.prototype.$cookie = Cookie


//使用工具类 this.$utils 调用对象
// 文档 https://xuliangzhan_admin.gitee.io/xe-utils/#/
Vue.use(VXEUtils, XEUtils)


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
