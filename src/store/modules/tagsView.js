 export default  {

    state: {
        tagNavList: [],
        breadcrumbList : []
    },
    getters:{
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
