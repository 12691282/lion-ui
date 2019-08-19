import Vuex from 'vuex'
import Vue from 'vue'
import RouterList from '@/router/routerList'

Vue.use(Vuex)

const getRouterList = (_routerList) => {
    let list = [];
    _routerList.forEach(obj =>{
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

export default new Vuex.Store({
    state: {
        tagNavList: []
    },
    getters:{
        menuList:(state, getter) => getRouterList(RouterList)
    },
    mutations: {

        setTagNavList(state, list){

        },
        addTag (state, route) {
            state.tagNavList.push(route)
        }
    },
    actions: {
        actionsAddCount(context, n = 0) {
            return context.commit('testMethod', n)
        }
    },
    modules: {
       //
    }
})
