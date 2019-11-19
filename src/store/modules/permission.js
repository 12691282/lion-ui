import RouterList from '../../router/routerList'


export default {

    state: {
        routerList: RouterList,
        resourceList : [],
    },
    getters: {
        routerList:(state, getter) => state.routerList,
    },
    mutations: {
        SET_ROUTER_LIST: (state, routerList) => {
            state.routerList = routerList
        },
        SET_RESOURCE_LIST: (state, resourceList) => {
            state.resourceList = resourceList
        }
    },
    actions: {
        setRouterList({commit}, routerList){
            commit('SET_ROUTER_LIST', routerList)
        },
        setResourceList({commit}, resourceList){
            commit('SET_RESOURCE_LIST', resourceList)
        }
    }

}


