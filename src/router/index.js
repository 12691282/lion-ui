import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import iView from 'iview'
import Ajax from '../config/ajax'
import Config from '../config';


Vue.use(Router)


const mainRoutes = {
  name: "main",
  path: '/main',
  component: () => import('@/view/main'),
  children:[
      {
          id:2,
          name: Config.homeName,
          path: Config.homeUrl,
          meta:{
              menuName:"首页",
              icon: "md-home"
          },
          component: () => import('@/view/system/home')
      }],
  beforeEnter (to, from, next) {
      console.log(to)
      // let token = Vue.cookie.get('token');
      // if (!token || !/\S/.test(token)) {
      //     next({ name: 'login' });
      // }
      
      next();
  }
}


const globalRoutes = [
  {  
    name: 'root',
    path: '/',
    redirect : '/' +Config.loginUrl
  },
  {  name:  Config.loginUrl,
     path: '/' + Config.loginUrl,
     component: () => import('@/view/login/login')
  }
]



const router =  new Router({
  mode:'history',
  routes: globalRoutes.concat(mainRoutes)
})


const tempList = [

  {
      id:2,
      name: 'system-accountList',
      path: '/system/accountList',
      meta:{
          menuName:"账号管理",
          icon: "md-person-add"
      },
      component: () => import('@/view/system/accountList')
  },
  {
      id:3,
      name: 'system-roleList',
      path: '/system/roleList',
      meta:{
          menuName:"角色管理",
          icon: "ios-paper-outline"
      },
      component: () => import('@/view/system/roleList')
  },
  {
      id:4,
      name: 'system-resourceList',
      path: '/system/resourceManage',
      meta:{
          menuName:"资源管理",
          icon: "ios-pricetags-outline"
      },
      component: () => import('@/view/system/resourceList')
  },
  {
      id:5,
      name: 'system-orgManage',
      path: '/system/orgManage',
      meta:{
          menuName:"组织机构管理",
          icon: "ios-aperture-outline"
      },
      component: () => import('@/view/system/organizationList')
  },
  {
      id:6,
      name: 'system-authorityManage',
      path: '/system/authorityManage',
      meta:{
          menuName:"权限管理",
          icon: "ios-barcode"
      },
      component: () => import('@/view/system/authorityManage')
  },
  {
      id:7,
      name: 'system-directionManage',
      path: '/system/directionManage',
      meta:{
          menuName:"字典管理",
          icon: "ios-book-outline"
      },
      component: () => import('@/view/system/organizationList')
  },
  {
      id:7,
      name: 'moduleA1',
      path: '/moduleA1',
      meta:{
          menuName:"功能模块-A-1",
          icon: "ios-build"
      },
      component: () => import('@/components/HelloWorld')
  },
  {
      id:8,
      name: 'moduleA2',
      path: '/moduleA2',
      meta:{
          menuName:"功能模块-A-2",
          icon: "ios-build"
      },
      component: () => import('@/components/HelloWorld')
  }

]

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if(store.getters.isLoginMark){
     next()
  }else{
      Ajax.post({
          url: "/account/getResourceList",
          params: {},
          notice: false,
          success: result => {
            let resourceList = result.data
            if(resourceList && resourceList.length > 0){
                store.dispatch('setResourceList', resourceList).then(res => {
                  store.dispatch('setUserLoginTrue')
                  //TODO 测试数据
                  mainRoutes.name = 'main-dynamic';
                  mainRoutes.children = tempList;
                 router.addRoutes([
                    { path: '*', redirect: '/404', hidden: true },
                   mainRoutes
                  ])

                  // let asyncRouter = res.routerList
                  // asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
                  // MenuList.name = 'main-dynamic';
                  // MenuList.children = asyncRouter;
                  // router.addRoutes(MenuList)
              })
            }
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
