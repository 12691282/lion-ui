import {RouterList,MenuList, BeforeEnter} from '../../router/routerList'


const setMenuListConst = (_routerList) => {
    let list = [];
    _routerList.forEach(obj =>{
        let meta = obj.meta;
        let children = obj.children;
        let menuObj={
            path: obj.path,
            menuId:obj.name,
            icon:meta.icon,
            menuName: meta.menuName
        }

        list.push(menuObj)
        if(children && children.length > 0){
            menuObj.children = [];
            toFillChildren(menuObj.children ,children);
        }
    });

    return list
}

const toFillChildren = (menuList, children) =>{
    children.forEach(obj =>{
        let meta = obj.meta;
        let menuObj={
            path: obj.path,
            menuId:obj.name,
            icon:meta.icon,
            menuName: meta.menuName
        }
        menuList.push(menuObj)
    });
}

export default {

    state: {
        routerList: RouterList.concat(MenuList),
        menuList : [],
        breadcrumbList : []
    },
    getters: {
        routerList:(state, getter) => state.routerList,
        menuList:(state, getter) => state.menuList,
        breadcrumbList:(state, getter) => state.breadcrumbList
    },
    mutations: {
        SET_ROUTER_LIST: (state, routerList) => {
            state.routerList = routerList
        },
        SET_MENU_LIST: (state, list) => {
            let rootMenu =  MenuList['children'].concat(list)
            state.menuList  = setMenuListConst(rootMenu)
        },
        SET_BREAD_CRUMB(state, route){
            let routeName = route.name
            let arr = []
            state.menuList.forEach(menu =>{
                let childrenList = menu.children;
                if(childrenList){
                    for(let childMenu of childrenList){
                        if(childMenu.menuId === routeName){
                            arr.push({
                                'name':menu.menuName
                            })
                            arr.push({
                                'name':childMenu.menuName
                            })
                        }
                    }
                }


            })
           state.breadcrumbList = arr
        },
        CLEAN_DATA_CACHE: (state) => {
            state.routerList =  RouterList.concat(MenuList)
            state.menuList = []
            state.breadcrumbList = []
        }
    },
    actions: {
        cleanDateCache({commit}){
            commit('CLEAN_DATA_CACHE')
        },
        setRouterList({commit}, routerList){
            commit('SET_ROUTER_LIST', routerList)
        },
        setResourceList({ commit, state }, resourceList) {
            return new Promise(resolve => {
              let menuList = [];
              let rList = [];
              setMemuFromResource(resourceList, menuList, rList)
              commit('SET_MENU_LIST', menuList)
              //所有路由对象列表
              let routerObj = {}
              //对象复制     
              Object.assign(routerObj,MenuList)
              routerObj.name = 'root-dynamic';
              routerObj.children = rList;
              let routerArr = [
                { path: '*', redirect: '/404', hidden: true },
                routerObj
              ]
              resolve({
                routerList: routerArr,
              })
            })
        },
        setBreadCrumb({commit}, route){
            commit('SET_BREAD_CRUMB', route)
        }
    }

}

const setMemuFromResource = (resourceList,  menuList, rList)=>{
    for(let resource of resourceList){
        let menuObj = fillMenuObj(resource)
        let children = resource['children']
        if(children && children.length > 0){
            menuObj['children'] = []
            setMemuFromResource(children, menuObj['children'], rList)
        }
        menuList.push(menuObj)
        rList.push(menuObj)
     
    }

}


const fillMenuObj = (resource) =>{
    let menuObj = {}
    let urlName = resource['resourceUrl']
    menuObj['id'] = resource['id']
    menuObj['name'] = urlName.replace('/', '-')
    menuObj['path'] =  urlName
    menuObj['component'] = toComponent(urlName)
    menuObj['meta'] = {
        'menuName' :resource['resourceName'] ,
        'icon' :  resource['icon'] || 'md-person-add'
    }
    menuObj['beforeEnter'] = BeforeEnter
    return menuObj
}

const toComponent = (toComponent) =>{
    return () => import('@/view/'+toComponent)
}

