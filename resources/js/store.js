import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
    },
    mutations: {
        SET_USER_DATA(state,payload) {
            state.user = payload;
            localStorage.setItem('user',JSON.stringify(payload));
            axios.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`;
        },
        CLEAR_USER_DATA(state) {
            state.user = null;
            localStorage.removeItem('user');
            location.reload();
        }
    },
    actions: {
        login({commit},credentians) {
            return new Promise((resolve,reject) =>{
                axios.post('/api/login',credentians)
                .then(response =>{
                    resolve(response);
                    commit('SET_USER_DATA',response.data);
                }).catch(error =>{
                    reject(error);
                });
            });
        },
        register({commit},users) {
            return new Promise((resolve,reject) =>{
                if(users.id) {
                    axios.put(`/api/user/${users.id}`,users)
                    .then(response =>{
                        resolve(response);
                    }).catch(error =>{
                        reject(error);
                    });
                }else {
                    axios.post('/api/user',users)
                    .then(response =>{
                        resolve(response);
                    }).catch(error =>{
                        reject(error);
                    });
                }
            });
        },
    },
    getters: {
        loggedin(state) {
            return !!state.user
        }
    }
});

export default store