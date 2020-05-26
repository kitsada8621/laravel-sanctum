<template>
    <div>

        <navbar-component />

        <div class="container">
            <h2 class="text-muted text-uppercase text-center mt-3 py-5">sign in</h2>
            <div class="row">
                <div class="col-lg-6 mx-auto">
                    <form @submit.prevent="login">
                        <div class="row" v-if="loggedin">
                            <div class="col-md-10 offset-2 mb-3">
                                <span class="text-danger">{{errorMessage}}</span>
                            </div>
                        </div>
                        <div class="form-group row">
                        <label for="email" class=" col-form-label col-md-2 text-right">Email</label>
                        <div class="col-md-10">
                            <input type="email" name="email" id="email" class="form-control" v-model="credentials.email">
                        </div>
                        </div>
                        <div class="form-group row">
                        <label for="password" class=" col-form-label col-md-2 text-right">Password</label>
                        <div class="col-md-10">
                            <input type="password" name="password" id="password" class="form-control" v-model="credentials.password">
                        </div>
                        </div>
                        <div class="row">
                            <div class="col-md-10 offset-2">
                                <button type="submit" class="btn btn-primary text-uppercase font-weight-bold">login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            credentials: {
                email: '',
                password: '',
            },
            loggedin : false,
            errorMessage: '',
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login',this.credentials)
            .then(response =>{
                this.$router.push('/');
            }).catch(error =>{
                this.loggedin = true;
                this.errorMessage = error.response.data.message;
            });
        }
    },
}
</script>

<style>

</style>