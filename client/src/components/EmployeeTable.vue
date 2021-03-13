<template>
    <v-container>
        <!-- Searchbox -->
        <v-row align="center">
            <v-col cols="4">
                <v-text-field
                    v-model="search"
                    single-line
                    label="Search Employees..."
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row>
            <v-col>
                <v-data-table
                    :headers="headers"
                    :items="employees"
                    :search="search"
                >
                    <!-- Delete Dialog -->
                    <template v-slot:top>
                        <v-toolbar flat>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="headline">Serius mau di delete ?</v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" @click="closeDelete">Cancel</v-btn>
                                        <v-btn color="primary" @click="deleteItemConfirm">Ok</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <!-- Employee Name (Link) -->
                    <template v-slot:[`item.name`]="{ item }">
                        <router-link :to="`/details/${item.id}/${linkNeated(item.name)}`">
                            {{ item.name }}
                        </router-link>
                    </template>

                    <!-- Actions colom -->
                    <template v-slot:[`item.actions`]="{ item }">
                        <router-link style="text-decoration:none;" :to="`/edit/${item.id}/${linkNeated(item.name)}`">
                            <v-icon
                                
                                class="mr-2"
                            >
                                mdi-pencil
                            </v-icon>
                        </router-link>

                        <v-icon
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            search: '',
            dialogDelete: false,
            selectedItemIndex: -1,
            headers: [
                {text: 'ID', value: 'id'},
                {text: 'Name', value: 'name'},
                {text: 'Departement', value: 'departement'},
                {text: 'Actions', value: 'actions'}
            ],
            // Employees data dummies
            employees: []
        }
    },
    methods: {
        linkNeated(link){
            return link.replace(/\s+/g, '-').toLocaleLowerCase()
        },
        deleteItem(item){
            console.log(item)
            this.selectedItemIndex = this.employees.indexOf(item)
            this.dialogDelete = true
            // console.log(this.selectedItemIndex)
        },
        closeDelete(){
            this.dialogDelete = false
            this.$nextTick(() => {
                this.selectedItemIndex = -1
            })
        },
        deleteItemConfirm(){
            const deleteEmployee = this.employees[this.selectedItemIndex]
            axios
                .delete(`http://localhost:3000/api/employees/${deleteEmployee.id}`)
                .then(response => {
                    this.employees.splice(this.selectedItemIndex, 1)
                    this.closeDelete()
                    console.log("DELETE SUCCESS", response.data)
                })
                .catch(error => {
                    console.log(error)
                })
            
        }
    },
    mounted(){
        axios
            .get('http://localhost:3000/api/employees/')
            .then(response => {
                this.employees = response.data
                // console.log(response.data)
            })
            .catch(error => console.log(error))
    }
}
</script>