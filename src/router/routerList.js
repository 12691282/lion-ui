import Login from '@/view/login/login'
import Main from '@/view/main'
import config from '@/config'


/****
 *  数据说明：
 *  因为$route 属性里有meta顾自定义此meta字段
 *
 *
 *
 */


export default [
    {
        name: '',
        path: '/',
        redirect : '/' +config.loginUrl,
        meta:{
            hideMenu: true
        }
    },
    {
        name:  config.loginUrl,
        path: '/' + config.loginUrl,
        component: Login,
        meta:{
            hideMenu: true
        }
    },
    {
        name: "main",
        path: '/main',
        component: Main,
        meta:{
            hideMenu: true
        },
        children:[
            {
                id:2,
                name: 'home',
                path: '/home-info',
                meta:{
                    menuName:"主页",
                    icon: "ios-build"
                },
                component: () => import('@/view/system/home')
            }]
    },
    {
        id:1,
        name: 'system-manage',
        path: '/systemManage',
        component: Main,
        meta:{
            menuName:"系统管理",
            icon: "ios-browsers-outline"
        },
        children:[
            {
                id:2,
                name: 'account-manage',
                path: '/accountManage',
                meta:{
                    menuName:"账号管理",
                    icon: "ios-build"
                },
                component: () => import('@/view/system/account')
            },
            {
                id:3,
                name: 'role-manage',
                path: '/roleManage',
                meta:{
                    menuName:"角色管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/components/HelloWorld')
            },
            {
                id:4,
                name: 'resource-manage',
                path: '/resourceManage',
                meta:{
                    menuName:"资源管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/components/HelloWorld')
            },
            {
                id:5,
                name: 'authority-manage',
                path: '/authorityManage',
                meta:{
                    menuName:"权限管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/components/HelloWorld')
            }
        ]
    },
    {
        id:6,
        name: 'function-module',
        path: '/functionModuleA',
        component: Main,
        meta:{
            menuName:"功能模块-1",
            icon:"ios-barcode"
        },
        children:[
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
    }
]
