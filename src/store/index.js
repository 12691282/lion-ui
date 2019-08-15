import Vuex from 'vuex'
import Vue from 'vue'
import routers from '@/router'
import RouterList from '@/router/routerList'

Vue.use(Vuex)

const getRouterList = (_routerList) => {
    let list = [];
    _routerList.forEach(obj =>{
        let detail = obj.detail;
        if(detail.hideMenu){
            return true;
        }
        let children = obj.children;
        let menuObj={
            menuId:obj.name,
            icon:detail.icon,
            menuName: detail.menuName
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
        let detail = obj.detail;
        let menuObj={
            menuId:obj.name,
            icon:detail.icon,
            menuName: detail.menuName
        }
        menuList.push(menuObj)
    });
}

export default new Vuex.Store({
    state: {
        count : 0

    },
    getters:{
        menuList:(state, getter) => getRouterList(RouterList)
    },
    mutations: {
        testMethod(state, n = 0){
            state.count += n
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
