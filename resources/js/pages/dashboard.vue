<template>
    <div>
        <navbar-component />

        <div class="container">
            <h1 class="text-muted text-uppercase text-center py-5">all user details.</h1>
            <button @click="openModal" class="btn btn-primary text-uppercase font-weight-bold mb-3 float-right">!new user</button>
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th width="10%" class="text-center">#</th>
                        <th width="50%">Name</th>
                        <th width="25%">Email</th>
                        <th width="15%" class="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index) in users" :key="index">
                        <td class="text-center">{{++index}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.email}}</td>
                        <td class="text-center">
                            <button @click="editModal(row)" class="btn btn-warning btn-sm  font-weight-bold text-uppercase"><small>edit</small></button>
                            <button @click="deleteModal(row.id)" class="btn btn-danger btn-sm  font-weight-bold text-uppercase"><small>delete</small></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" ref="userModal" id="userModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Modal title</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <form @submit.prevent="onSubmit">
                        <div class="modal-body">
                            <div class="container-fluid">
                                <div class="form-group row">
                                    <label for="" class="col-form-label col-md-3 text-md-right">Name</label>
                                    <div class="col-md-9">
                                        <input type="text" v-model="user.name" class="form-control">
                                        <small v-if="errors.name" class="text-danger">{{errors.name[0]}}</small>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="" class="col-form-label col-md-3 text-md-right">Email</label>
                                    <div class="col-md-9">
                                        <input type="email" v-model="user.email" class="form-control">
                                        <small v-if="errors.email" class="text-danger">{{errors.email[0]}}</small>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="" class="col-form-label col-md-3 text-md-right">Password</label>
                                    <div class="col-md-9">
                                        <input type="password" v-model="user.password" class="form-control">
                                        <small v-if="errors.password" class="text-danger">{{errors.password[0]}}</small>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="" class="col-form-label col-md-3 text-md-right">Password Confirm</label>
                                    <div class="col-md-9">
                                        <input type="password" v-model="user.password_confirm" class="form-control">
                                        <small v-if="errors.password_confirm" class="text-danger">{{errors.password_confirm[0]}}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary" id="btnsubmit"></button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div class="modal-body">
                        <center>
                            <h5>Are you sure. ?</h5>
                        </center>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-outline-danger" @click="onDelete">Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    mounted() {
        this.fetchData();
        
    },
    data() {
        return {
            users: {},
            user:{
                id:'',
                name: '',
                email: '',
                password:'',
                password_confirm:'',
            },
            errors: {},
        }
    },
    methods: {
        fetchData() {
            this.axios.get('/api/user')
            .then(response =>{
                this.users = response.data;
            });
        },
        openModal() {
           $('#userModal').modal('show');
           $('.modal-title').text(`Add User`);
           $('#btnsubmit').text(`Save`);
            this.user.id = '';
            this.user.name = '';
            this.user.email = '';
            this.user.password = '';
            this.user.password_confirm = '';
            this.errors = {};
        },
        editModal(data) {
           $('#userModal').modal('show');
           $('.modal-title').text(`Edit User`);
           $('#btnsubmit').text(`Update`);
            const {id,name,email,password} = data;
            this.user.id = id;
            this.user.name = name;
            this.user.email = email;
            this.user.password = password;
            this.user.password_confirm = password;
            this.errors = {};
        },
        onSubmit() {
            this.$store.dispatch('register',this.user)
            .then(response =>{
                this.fetchData();
                $('#userModal').modal('hide');
            }).catch(error =>{
                this.errors = error.response.data.errors;
            });
        },
        deleteModal(id) {
            $('#deleteModal').modal('show');
            $('.modal-title').text('Delete Data');
            this.user.id = id;
        },
        onDelete() {
            this.axios.delete(`/api/user/${this.user.id}`)
            .then(response =>{
                $('#deleteModal').modal('hide');
                this.fetchData();
            });
        }
    },
}
</script>

<style>

</style>