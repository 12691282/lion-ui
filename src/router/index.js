import Vue from 'vue'
import Router from 'vue-router'
import RouterList from './routerList'
import iView from 'iview'
import Ajax from '../config/ajax'

Vue.use(Router)


const router =  new Router({
  mode:'history',
  routes: RouterList
})


router.beforeEach((to, from, next) => {
    iView.LoadingBar.start()
    console.log(to)

  // if(to.name !== config.loginUrl){
  //     next({
  //         name: config.loginUrl // 跳转到登录页
  //     })
  // }
  next()
})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})


const routerListFun = () => {
  Ajax.post({
      url: "/account/getResourceList",
      params: {},
      notice: false,
      success: result => {
        console.log(result)
      }
  });
}


export default router;
