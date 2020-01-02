import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'
import iView from 'iview'
import Ajax from '../config/ajax'


Vue.use(Router)


const router =  new Router({
  mode:'history',
  routes: Store.getters.routerList
})


router.beforeEach((to, from, next) => {
  console.log('router from ', from.fullPath, ' to :', to.fullPath)
  if(Store.getters.isLoginMark){
     next()
  }else{
      Ajax.post({
          url: "/resource/getAuthResourceList",
          notice: false,
          success: result => {
            let resourceList = result.data
            if(resourceList && resourceList.length > 0){
                Store.dispatch('setResourceList', resourceList).then(res => {
                  Store.dispatch('setUserLoginState', true)
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

})

router.afterEach(to => {
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})


 


export default router;
