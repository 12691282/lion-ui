import Vuex from 'vuex'
import Vue from 'vue'
import routers from '@/router'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        count : 0
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
