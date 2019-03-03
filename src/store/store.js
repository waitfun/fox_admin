import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGINOUT = 'USER_LOGINOUT'

export default new Vuex.Store({
    state: {
        'token' :null
    },
    mutations: {
        [USER_LOGIN]: (state,data) => {
           //localStorage.token = data;
          
            state.token = data;
            localStorage.setItem("token",data)
        },
        [USER_LOGINOUT]: (state) => {
            localStorage.removeItem('token');
            state.token = null
        }
    }
})