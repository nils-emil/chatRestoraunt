const auth = require('../../middleware/auth')
const express = require('express')
const router = express.Router()
const TableService = require('../../services/tableService')
const tableService = new TableService()

router.get('', async (req, res) => {
    const tables = await tableService.fetchAll()
    res.send(tables)
})

router.post('/', auth, async (req, res) => {
    const tableDto = req.body
    const table = tableService.update(tableDto)
    res.send(table)
})

module.exports = router
