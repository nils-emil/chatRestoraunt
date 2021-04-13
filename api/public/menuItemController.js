const express = require('express');
const MenuItem = require('../../models/menuItem').MenuItem
const router = express.Router({mergeParams: true});

router.route('').get(function (req, res) {
    console.log( req.query.categoryId)
    if (req.query.categoryId) {
        MenuItem.find({ ...req.query, 'categoryId': req.query.categoryId })
            .exec()
            .then(menuItems => {
                res.json(menuItems)
            })
    } else {
        MenuItem.find({ ...req.query})
            .exec()
            .then(menuItems => {
                res.json(menuItems)
            })
    }
})

router.route('/:categoryId').get(function (req, res) {
    MenuItem.find({ ...req.query, 'categoryId': req.params.categoryId })
        .exec()
        .then(menuItems => {
            res.json(menuItems)
        })
})

module.exports = router;
