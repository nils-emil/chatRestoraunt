const auth = require('../../middleware/auth')
const express = require('express')
const router = express.Router()
const TableService = require('../../services/tableService')
const tableService = new TableService()

router.get('', async (req, res) => {
    const tables = await tableService.fetchAll()
    res.send(tables)
})

router.route('').post(async function (req, res) {
    await tableService.createOrUpdateTable(req.body)
    res.send({ok: true})
});

router.delete('/:id', auth, async (req, res) => {
    await tableService.delete(req.params.id)
    res.send({ok: true})
})


module.exports = router
