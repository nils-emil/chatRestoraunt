const express = require('express');
const router = express.Router({mergeParams: true});
const Table = require('../../models/table').Table

router.route('/:tableCode').get(function (req, res) {
    let code = req.params.tableCode;
    Table.findOne({code: code}, function (err, MenuItem) {
        res.json(MenuItem);
    });
});

module.exports = router;
