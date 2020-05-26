require('./bootstrap');
window.Vue = require('vue');
import router from './routes'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.component('navbar-component', require('./components/navbar.vue').default);

const app = new Vue({
    el: '#app',
    router,
    store,
    created() {
        const userString = localStorage.getItem('user');
        if(userString) {
            const userObj = JSON.parse(userString);
            this.$store.commit('SET_USER_DATA',userObj);
        }
    }
});

export default app