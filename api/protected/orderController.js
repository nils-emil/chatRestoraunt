const express = require('express')
const router = express.Router({mergeParams: true})
const Order = require('../../models/order').Order

router.route('/all').get(async function (req, res) {
    let limit = parseInt(req.query.limit) || 50
    Order
        .find()
        .limit(limit)
        .populate('orderContent.menuItemId')
        .sort({createdTime: -1})
        .exec((err, orders) => {
            res.json(orders)
        })
})

router.route('/:tableCode').get(function (req, res) {
    let id = req.params.tableCode
    Order
        .find({createdDate: new Date(), tableCode: id}).populate('orderContent.menuItemId')
        .sort({createdTime: -1})
        .then(allOrdersFromTable => {
            res.json(allOrdersFromTable)
        })
})

module.exports = router

