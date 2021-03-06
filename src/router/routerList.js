import Login from '@/view/login/login'
import Main from '@/view/main'
import Config from '@/config'
import Cookies from 'js-cookie'

/****
 *  数据说明：
 *  因为$route 属性里有meta顾自定义此meta字段
 *
 */

export const MenuList = {
    name: "main",
    path: '/',
    redirect : '/' +Config.loginUrl,
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
            component: () => import('@/view/system/home'),
            beforeEnter:(to, from, next)=>{
                BeforeEnter(to, from, next)
            }
        }]
   
}


export const RouterList = [
{
    name:  Config.loginUrl,
    path: '/' + Config.loginUrl,
    component: Login,
    meta:{
        hideMenu: true
    }
}]

export const BeforeEnter = (to, from, next) => {
    let token = Cookies.get('token');

    if (!token || !/\S/.test(token)) {
        next({ name: Config.loginUrl});
    }
    
    next();
}

export const staticList = [{
        name: '',
        path: '/',
        redirect : '/' +Config.homeUrl,
        meta:{
            hideMenu: true
        }
    },
    {
        name:  Config.loginUrl,
        path: '/' + Config.homeUrl,
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
                name: Config.homeName,
                path: Config.homeUrl,
                meta:{
                    menuName:"首页",
                    icon: "md-home"
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
            icon: "ios-construct-outline"
        },
        children:[
            {
                id:2,
                name: 'account-manage',
                path: '/system/accountList',
                meta:{
                    menuName:"账号管理",
                    icon: "md-person-add"
                },
                component: () => import('@/view/system/accountList')
            },
            {
                id:3,
                name: 'role-manage',
                path: '/system/roleList',
                meta:{
                    menuName:"角色管理",
                    icon: "ios-paper-outline"
                },
                component: () => import('@/view/system/roleList')
            },
            {
                id:4,
                name: 'resource-manage',
                path: '/system/resourceManage',
                meta:{
                    menuName:"资源管理",
                    icon: "ios-pricetags-outline"
                },
                component: () => import('@/view/system/resourceList')
            },
            {
                id:5,
                name: 'org-manage',
                path: '/system/orgManage',
                meta:{
                    menuName:"组织机构管理",
                    icon: "ios-aperture-outline"
                },
                component: () => import('@/view/system/organizationList')
            },
            {
                id:6,
                name: 'authority-manage',
                path: '/system/authorityManage',
                meta:{
                    menuName:"权限管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/view/system/authorityManage')
            },
            {
                id:7,
                name: 'direction-manage',
                path: '/system/directionManage',
                meta:{
                    menuName:"字典管理",
                    icon: "ios-book-outline"
                },
                component: () => import('@/view/system/organizationList')
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


// export default defaultModuleList

 
