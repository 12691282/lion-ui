import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        count : 0
    },
    getters : {
        getterCount(state, n = 0) {
            return state.count + n
        }
    },
    mutations: {
        testMethod(state, n = 0){
            console.log(n)
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
