const express = require('express')
const router = express.Router()
const db = require('../db')

// CREATE sebuah data
router.post('/', async(req, res, next) => {
    try {
        const employee = req.body
        const sqlText = `INSERT INTO employees (name, gender, departement, about) VALUES ($1, $2, $3, $4) RETURNING *`
        const sqlParams = [employee.name, employee.gender, employee.departement, employee.about]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// READ seluruh employee
router.get('/', async(req, res, next) => {
    try {
        const sqlText = `SELECT * FROM employees`;
        const result = (await db.query(sqlText)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// READ details employee tertentu
router.get('/:id', async(req, res, next) => {
    try {
        const sqlText = `SELECT * FROM employees WHERE id = $1`
        const sqlParams = [req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

// UPDATE data
router.put('/:id', async(req, res, next) => {
    try {
        const employee = req.body
        const sqlText = `UPDATE employees SET name = $1, gender = $2, departement = $3, about = $4
        WHERE id = $5 RETURNING *`
        const sqlParams = [employee.name, employee.gender, employee.departement, employee.about, req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})


// DELETE seorang employee tertentu
router.delete('/:id', async(req, res, next) => {
    try {
        const sqlText = `DELETE FROM employees WHERE id = $1 RETURNING *`
        const sqlParams = [req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router