import Login from '@/view/login/login'
import Main from '@/view/main'
import config from '@/config'

export default [
    {
        name: '',
        path: '/',
        redirect : '/' +config.loginUrl,
        detail:{
            hideMenu: true
        }
    },
    {
        name: config.loginUrl,
        path: '/'+config.loginUrl,
        component: Login,
        detail:{
            hideMenu: true
        }
    },
    {
        name: config.mainUrl,
        path: '/'+config.mainUrl,
        component: Main,
        detail:{
            hideMenu: true
        }
    },
    {
        name: 'system-manage',
        path: '/systemManage',
        component: Main,
        detail:{
            menuName:"系统管理",
            icon: "ios-browsers-outline"
        },
        children:[
            {
                name: 'account-manage',
                path: '/accountManage',
                detail:{
                    menuName:"账号管理",
                    icon: "ios-build"
                },
                component: () => import('@/components/HelloWorld')
            },
            {
                name: 'role-manage',
                path: '/roleManage',
                detail:{
                    menuName:"角色管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/components/HelloWorld')
            },
            {
                name: 'resource-manage',
                path: '/resourceManage',
                detail:{
                    menuName:"资源管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/components/HelloWorld')
            },
            {
                name: 'authority-manage',
                path: '/authorityManage',
                detail:{
                    menuName:"权限管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/components/HelloWorld')
            }
        ]
    },
    {
        name: 'function-module',
        path: '/functionModuleA',
        component: Main,
        detail:{
            menuName:"功能模块-1",
            icon:"ios-barcode"
        },
        children:[
            {
                name: 'moduleA1',
                path: '/moduleA1',
                detail:{
                    menuName:"功能模块-A-1",
                    icon: "ios-build"
                },
                component: () => import('@/components/HelloWorld')
            },
            {
                name: 'moduleA2',
                path: '/moduleA2',
                detail:{
                    menuName:"功能模块-A-2",
                    icon: "ios-build"
                },
                component: () => import('@/components/HelloWorld')
            }
        ]
    }
]
