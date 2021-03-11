<template>
    <v-container>
        <h1 class="text-center mb-10">Registration Form</h1>

        <!-- Fullname Text field -->
        <v-row>
            <v-col cols="5">
                <v-text-field
                    v-model="editedItem.name"
                    label="Employee Fullname"
                ></v-text-field>
            </v-col>
        </v-row>

        <!-- Gender dropdown -->
        <v-row>
            <v-col cols="5">
                <v-select
                    v-model="editedItem.gender"
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
                >Save</v-btn>
            </v-col>
            <v-dialog
                v-model="dialog"
                width="500"
            >
                <v-card>

                    <v-card-title>
                        <p v-if="success">Employee Registration Success</p>
                        <p v-if="!success">Employee Registration Failed</p>
                    </v-card-title>

                    <v-card-text>
                        <p v-if="success">You can check data in employee table</p>
                        <p v-if="!success">Try again later</p>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            :to="`/`"
                        >OK</v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>
        </v-row>

    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            genderList: ["Male", "Female"],
            departementList: ["Engineering", "Training", "Bussiness", "Service", "Human Resource"],
            dialog: false,
            isOperationSuccess: false,
            editedItem: {
                name: '',
                gender: '',
                departement: '',
                about: ''
            }
        }
    },
    computed: {
        success(){
            return this.isOperationSuccess
        }
    },
    methods: {
        save(){
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
                this.dialog = true
                console.log(error)
            })       
        }
    }
}
</script>