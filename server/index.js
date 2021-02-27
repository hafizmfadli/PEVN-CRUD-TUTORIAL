const express = require('express')
const app = express()
const PORT = 3000

app.get('/', async(req, res, next) => {
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Listen to PORT ${PORT}`)
})