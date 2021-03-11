<template>
    <v-form v-model="valid">
        <v-container v-if="employee">
            <h1 class="text-center mb-10" v-if="registration">Registration Form</h1>
            <h1 class="text-center mb-10" v-if="edit">Edit Form</h1>

            <!-- Fullname Text field -->
            <v-row>
                <v-col cols="5">
                    <v-text-field
                        v-model="editedItem.name"
                        :rules="nameRules"
                        label="Employee Fullname"
                    ></v-text-field>
                </v-col>
            </v-row>

            <!-- Gender dropdown -->
            <v-row>
                <v-col cols="5">
                    <v-select
                        v-model="editedItem.gender"
                        :rules="genderRules"
                        :items="genderList"
                        label="Gender"
                    >
                    </v-select>
                </v-col>
            </v-row>

            <!-- Departement Autocomplete -->
            <v-row>
                <v-col cols="5">
                    <v-autocomplete
                        v-model="editedItem.departement"
                        :rules="departementRules"
                        :items="departementList"
                        label="Departement"
                    ></v-autocomplete>
                </v-col>
            </v-row>

            <!-- About Textarea -->
            <v-row>
                <v-col>
                    <v-textarea
                        v-model="editedItem.about"
                        outlined
                        label="About Employee"
                    ></v-textarea>
                </v-col>
            </v-row>

            <!-- Actions button -->
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="2">
                    <v-btn
                        color="primary"
                        @click.stop="save"
                        :disabled="!valid"
                    >Save</v-btn>
                </v-col>
                <v-dialog
                    v-model="dialog"
                    width="500"
                >
                    <v-card>

                        <v-card-title>
                            <p v-if="success && registration">Employee Registration Success</p>
                            <p v-if="!success && registration">Employee Registration Failed</p>
                            <p v-if="success && edit">Employee Edit Success</p>
                            <p v-if="!success && edit">Employee Edit Failed</p>
                        </v-card-title>

                        <v-card-text>
                            <p v-if="success">You can check data in employee table</p>
                            <p v-if="!success">Try again</p>
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click.stop="dialog = !dialog"
                                color="primary"
                                :to="success ? '/' : $route.name"
                            >OK</v-btn>
                        </v-card-actions>

                    </v-card>
                </v-dialog>
            </v-row>

        </v-container>
    </v-form>
</template>

<script>
import axios from 'axios'

export default {
    props: {
        registration: {
            type: Boolean,
            default:false
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return{
            employee: null,
            genderList: ["Male", "Female"],
            departementList: ["Engineering", "Training", "Bussiness", "Service", "Human Resource"],
            dialog: false,
            isOperationSuccess: false,
            editedItem: {
                name: '',
                gender: '',
                departement: '',
                about: ''
            },
            valid: false,
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 40 || 'Name must be less than 40 characters',
                v => v.length >= 3 || 'Name must be more than 3 characters'
            ],
            genderRules: [
                v => !!v || 'Gender is required'
            ],
            departementRules: [
                v => !!v || 'Departement is required'
            ]
        }
    },
    computed: {
        success(){
            return this.isOperationSuccess
        }
    },
    methods: {
        editItem(item){
            this.editedItem = Object.assign({}, item)
        },
        save(){

            if(this.registration){
                axios({
                    method: 'post',
                    url: 'http://localhost:3000/api/employees/',
                    data: this.editedItem
                })
                .then(response => {
                    // Tampilkan dialog registrasi sukses
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(response.data)
                })
                .catch(error => {
                    // Tampilkan dialog regitrasi gagal
                    this.isOperationSuccess = false
                    this.dialog = true
                    console.log(error)
                })       
            }

            if(this.edit){
                const id = this.$route.params.id
                axios({
                    method: 'put',
                    url: `http://localhost:3000/api/employees/${id}`,
                    data: this.editedItem
                })
                .then(response => {
                    // Tampilkan dialog edit berhasil
                    this.isOperationSuccess = true
                    this.dialog = true
                    console.log(response.data)
                })
                .catch(error => console.log(error))
            }
        }
    },
    created(){
        if(this.edit){
            // GET info employee yang mau di edit
            const id = this.$route.params.id
            axios
                .get(`http://localhost:3000/api/employees/${id}`)
                .then(response => {
                    this.employee = response.data[0]
                    this.editItem(this.employee)           
                })
                .catch(error => {
                    console.log(error)
                })
        }

        if(this.registration){
            this.employee = this.editedItem
        }
    }
}
</script>