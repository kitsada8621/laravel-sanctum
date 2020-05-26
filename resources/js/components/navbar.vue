<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <router-link class="navbar-brand" to="/">Sanctum Test</router-link>
                <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"></button>
                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <router-link class="nav-link" to="/dashboard">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <a @click="logout" href="#" v-if="loggedin" class="nav-link">{{user.user.name}} <i class="fa fa-sign-out"></i></a>
                            <router-link v-if="!loggedin" class="nav-link" to="/login">Login</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
export default {
    data() {
        return {
            
        }
    },
    methods: {
        logout() {
            this.$store.commit('CLEAR_USER_DATA');
        }
    },
    computed: {
        ...mapState([
            'user'
        ]),
        ...mapGetters([
            'loggedin'
        ])
    },
}
</script>

<style>

</style>