 export default  {

    state: {
        tagNavList: []
    },
    getters:{
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
        }
    },
    actions: {
      
    }

}
