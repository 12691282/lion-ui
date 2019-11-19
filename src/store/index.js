import Vuex from 'vuex'
import Vue from 'vue'
import tagsView from './modules/tagsView'
import user from './modules/user'
Vue.use(Vuex)

 

export default new Vuex.Store({
    modules: {
        tagsView,
        user
    }
 
})
