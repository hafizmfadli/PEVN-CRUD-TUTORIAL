const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
const createEmployeeTable = require('./db/EmployeeStorage')
const employees = require('./router/employees')

app.use(cors())
app.use(express.json())
app.use('/api/employees', employees)

app.listen(PORT, async() => {
    try {
        await createEmployeeTable()
        console.log(`LISTEN TO PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})