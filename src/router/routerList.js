import Login from '@/view/login/login'
import Main from '@/view/main'
import Config from '@/config'
import Ajax from '@/config/ajax'

/****
 *  数据说明：
 *  因为$route 属性里有meta顾自定义此meta字段
 *
 *
 *
 */


let defaultModuleList = [{
    name: 'root',
    path: '/',
    redirect : '/' +Config.loginUrl,
    meta:{
        hideMenu: true
    }
},
{
    name:  Config.loginUrl,
    path: '/' + Config.loginUrl,
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
                menuName:"主页",
                icon: "md-home"
            },
            component: () => import('@/view/system/home')
        }]
}]



// let path = '@/view'+item.resourceUrl
const ajaxResourse = () => {


    // let fillToModuleInfo = item => {
    //     if(!item.resourceUrl){
    //            return 
    //     }
    //     let name = item.resourceUrl.replace('/', '-')
    
    //     let module = {
    //         name,
    //         id:item.id,
    //         path: '/'+item.resourceUrl,
    //         mata:{
    //             menuName: item.resourceName
    //         }
    //     }
    //     return module
    // }

    // Ajax.post({
    //     url: "/account/getResourceList",
    //     params: {},
    //     notice: false,
    //     success: result => {
    //         let data = result.data
    //         if(data.length === 0){
    //             return 
    //         }
    //         for(let item of data){
    //             let module = fillToModuleInfo(item)
    //             if(module){
    //                 module.component = Main
    //                 if(item.children.length > 0){
    //                     let childrenArr = []
    //                     for(let child of item.children){
    //                         let cModule = fillToModuleInfo(child)
    //                         childrenArr[childrenArr.length] = cModule
    //                     }
    //                     module.children = childrenArr;
    //                 } 
    //                 defaultModuleList.push(module)
    //             }
              
    //         }
        
    //     }
    // });
   
    return list //defaultModuleList
}


// export default [
    let list = [{
        name: '',
        path: '/',
        redirect : '/' +Config.loginUrl,
        meta:{
            hideMenu: true
        }
    },
    {
        name:  Config.loginUrl,
        path: '/' + Config.loginUrl,
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
                    menuName:"主页",
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
                path: '/resourceManage',
                meta:{
                    menuName:"资源管理",
                    icon: "ios-pricetags-outline"
                },
                component: () => import('@/view/system/resourceList')
            },
            {
                id:5,
                name: 'menu-manage',
                path: '/menuManage',
                meta:{
                    menuName:"组织机构管理",
                    icon: "ios-aperture-outline"
                },
                component: () => import('@/view/system/organizationList')
            },
            {
                id:6,
                name: 'authority-manage',
                path: '/authorityManage',
                meta:{
                    menuName:"权限管理",
                    icon: "ios-barcode"
                },
                component: () => import('@/view/system/authorityManage')
            },
            {
                id:7,
                name: 'direction-manage',
                path: '/directionManage',
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


export default ajaxResourse()
