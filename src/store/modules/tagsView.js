import RouterList from '@/router/routerList'


const getRouterList = () => {
    let list = [];
    RouterList.forEach(obj =>{
        let meta = obj.meta;
        if(meta.hideMenu){
            return true;
        }
        let children = obj.children;
        let menuObj={
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
            menuId:obj.name,
            icon:meta.icon,
            menuName: meta.menuName
        }
        menuList.push(menuObj)
    });
}

export default  {

    state: {
        tagNavList: [],
        breadcrumbList : [],
        menuList: getRouterList()
    },
    getters:{
        menuList:(state, getter) => state.menuList,
        breadcrumbList:(state, getter) => state.breadcrumbList,
        tagNavList:(state, getter) => state.tagNavList
    },
    mutations: {
        setTagNavList(state, tab){
            state.tagNavList = tab
        },
        setBreadcrumbList(state, breadcrumb){
            state.breadcrumbList = breadcrumb
        },
        addTag (state, route) {
            state.tagNavList.push(route)
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
        }
    },
    actions: {
        setBreadCrumb({commit}, route){
            commit('SET_BREAD_CRUMB', route)
        }
    }

}
