


export default {

    state: {
        isLoginMark:false,
        token: '',
        user: {},
        roles: [],
    },
    getters: {
        isLoginMark:(state, getter) => state.isLoginMark
    },
    mutations: {

        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USER: (state, user) => {
            state.user = user
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        },
        SET_LOGIN_MARK: (state, isLogin) => {
            state.isLoginMark = isLogin
        }
    },
    actions: {
    
    }

}


