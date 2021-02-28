const express = require('express')
const app = express()
const PORT = 3000
const createEmployeeTable = require('./db/EmployeeStorage')

app.get('/', async(req, res, next) => {
    res.send("Hello World")
})

app.listen(PORT, async() => {
    try {
        await createEmployeeTable()
        console.log(`LISTEN TO PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})