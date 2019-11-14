


export default {


    state: {
        token: '',
        user: {},
        roles: [],
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
        }


    },
    actions: {
    
    }

}


