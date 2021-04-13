const express = require('express');
const router = express.Router({mergeParams: true});

const Order = require('../../models/order').Order
const MenuItemAmount = require('../../models/order').MenuItemAmount

router.route('/add/:tableCode').post(function (req, res) {
    let listOfOrderedMenuItemsWithAmounts = []
    let orderData = {}
    for (let i in req.body) {
        let menuItemAmountInformation = {}
        menuItemAmountInformation.amount = req.body[i].amount
        menuItemAmountInformation.menuItemId = req.body[i].item._id
        listOfOrderedMenuItemsWithAmounts.push(new MenuItemAmount(menuItemAmountInformation))
    }
    orderData.createdTime = new Date();
    orderData.tableCode = req.params.tableCode;
    orderData.orderContent = listOfOrderedMenuItemsWithAmounts
    orderData.paid = false
    orderData.isWaiting = true
    orderData.callType = 'ORDER'
    orderData.cancelled = false
    let order = new Order(orderData);
    order.save()
        .then(e => {
            res.status(200).json(e)
            Order
                .findOne({_id: e._id})
                .populate('orderContent.menuItemId')
                .sort({createdTime: -1})
                .exec((err, order) => {
                    global.activeConnections.forEach(function (socket) {
                        if (socket) {
                            socket.emit("NEW-ORDER", order)
                        }
                    });
                })
        })
});


router.route('/add/:tableCode/call-service/:type').post(function (req, res) {
    let orderData = {}
    orderData.createdTime = new Date();
    orderData.tableCode = req.params.tableCode;
    orderData.paid = false
    orderData.isWaiting = true
    orderData.cancelled = false
    orderData.callType = req.params.type
    let order = new Order(orderData);
    order.save()
        .then(e => {
            global.activeConnections.forEach(function (socket) {
                if (socket) {
                    socket.emit("NEW-ORDER", orderData)
                }
            });
            res.status(200).json(e)
        })
});

module.exports = router;

