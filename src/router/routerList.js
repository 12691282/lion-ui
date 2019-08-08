import Login from '@/view/login/login'
import Main from '@/view/main'
import config from '@/config'

export default [
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
