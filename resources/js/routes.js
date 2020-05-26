import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from './pages/dashboard.vue'
import Login from './pages/login.vue'
import Home from './pages/home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        }, 
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        }
    ]
});

router.beforeEach((to, from, next) =>{
    const token = JSON.parse(localStorage.getItem('user'));
    if(to.matched.some(record => record.meta.requiresAuth) && !token) {
       return next('/login');
    }
    return next();
});

export default router