<template>
    <div v-if="employee" class="ml-5">
        <h1>Employee Details</h1>
        <p>Name : {{ employee.name }}</p>
        <p>Gender : {{ employee.gender }}</p>
        <p>Departement : {{ employee.departement }}</p>
        <p>About : {{ employee.about }}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return{
            employee: null
        }
    },
    methods: {
        fetchData(){
            axios
                .get(`http://localhost:3000/api/employees/${this.$route.params.id}`)
                .then(response => {
                    this.employee = response.data[0]
                })
        }
    },
    created(){
        this.fetchData()
    }
}
</script>