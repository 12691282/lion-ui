import Vue from 'vue'
import Router from 'vue-router'
import RouterList from './routerList'

Vue.use(Router)


const router =  new Router({
  routes: RouterList
})


router.beforeEach((to, from, next) => {
  // if(to.name !== config.loginUrl){
  //     next({
  //         name: config.loginUrl // 跳转到登录页
  //     })
  // }
  next()
})

export default router;
