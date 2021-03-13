const express = require('express')
const compression = require('compression')
const cors = require('cors')
const debug = require('debug')('app')
const app = express()
const PORT = 3000
const createEmployeeTable = require('./db/EmployeeStorage')
const employees = require('./router/employees')

app.use(cors())
app.use(compression())
app.use(express.json())
app.use('/api/employees', employees)

app.listen(process.env.PORT || PORT, async() => {
    try {
        await createEmployeeTable()
        debug(`LISTEN TO PORT ${PORT}`)
    } catch (error) {
        debug(error)
    }
})