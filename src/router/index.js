import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/login'
import Main from '@/view/main'
import config from '@/config'

Vue.use(Router)

const routes = [
    {
        name: '',
        path: '/',
        redirect : '/' +config.loginUrl
    },
    {
        name: config.loginUrl,
        path: '/'+config.loginUrl,
        component: Login
    },
    {
        name: config.mainUrl,
        path: '/'+config.mainUrl,
        component: Main
    },
    {
        name: 'helloWorld',
        path: '/helloWorld',
        component: () => import('@/components/HelloWorld')
    }

]

const router =  new Router({
  routes: routes
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
