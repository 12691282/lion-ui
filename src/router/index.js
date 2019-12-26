import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import iView from 'iview'
import Ajax from '../config/ajax'


Vue.use(Router)


const router =  new Router({
  mode:'history',
  routes: store.getters.routerList
})


router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if(store.getters.isLoginMark){
     next()
  }else{
      Ajax.post({
          url: "/resource/getAuthResourceList",
          notice: false,
          success: result => {
            let resourceList = result.data
            if(resourceList && resourceList.length > 0){
                store.dispatch('setResourceList', resourceList).then(res => {
                  store.dispatch('setUserLoginState', true)
                  let asyncRouter = res.routerList
                  router.addRoutes(asyncRouter)
              })
            }
          },
          failure:error => {
              console.log('router beforeEach error')
          }
      });
      next()
  }

   
    


    

  // if(to.path === config.loginUrl){
  //     next({
  //         name: config.loginUrl // 跳转到登录页
  //     })
  // }

})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})


 


export default router;
