import Vuex from 'vuex'
import Vue from 'vue'
import tagsView from './modules/tagsView'
import user from './modules/user'
import permission from './modules/permission'
Vue.use(Vuex)

 

export default new Vuex.Store({
    modules: {
        tagsView,
        user,
        permission
    }
 
})
