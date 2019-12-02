import {routerList,MenuList} from '../../router/routerList'


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
        routerList: routerList,
        menuList : [],
    },
    getters: {
        routerList:(state, getter) => state.routerList,
        menuList:(state, getter) => state.menuList,
    },
    mutations: {
        SET_ROUTER_LIST: (state, routerList) => {
            state.routerList = routerList
        },
        SET_MENU_LIST: (state, list) => {
            let rootMenu =  MenuList['children'].concat(list)
            state.routerList = rootMenu
            state.menuList  = setMenuListConst(rootMenu)
        }
    },
    actions: {
        setRouterList({commit}, routerList){
            commit('SET_ROUTER_LIST', routerList)
        },
        setMenuList({commit}, menuList){
            commit('SET_MENU_LIST', menuList)
        },
        setResourceList({ commit, state }, resourceList) {
            return new Promise(resolve => {
              let menuList = [];
              setMemuFromResource(resourceList, menuList)
              commit('SET_MENU_LIST', menuList)
              resolve({
                routerList: [state.routerList],
              })
            })
          },
        

    }

}

const setMemuFromResource = (resourceList,  menuList)=>{
    for(let resource of resourceList){
        let menuObj = fillMenuObj(resource)
        let children = resource['children']
        if(children && children.length > 0){
            menuObj['children'] = []
            setMemuFromResource(children, menuObj['children'])
        }
        menuList.push(menuObj)
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
    return menuObj
}

const toComponent = (toComponent) =>{
    return () => import('@/view/'+toComponent)
}

