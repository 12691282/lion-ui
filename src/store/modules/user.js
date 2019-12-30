


export default {

    state: {
        isLoginMark:false,
        token: '',
        roles: [],
    },
    getters: {
        isLoginMark:(state, getter) => state.isLoginMark,
    },
    mutations: {

        SET_TOKEN: (state, token) => {
            state.token = token
        },
 
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_LOGIN_MARK: (state, isLogin) => {
            state.isLoginMark = isLogin
        }
    },
    actions: {
        setUserLoginState: ({commit}, stateMark) => {
            commit('SET_LOGIN_MARK', stateMark)
        },
     
    }

}


