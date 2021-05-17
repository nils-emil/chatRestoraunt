const Order = require('../models/order').Order


const orderSocket = (socket, io) => {
    socket.on('MARK_ORDER_SERVICED', function (data) {
        Order.findOne({_id: data._id},
            (err, order) => {
                if (order) {
                    order['isWaiting'] = order && !order['isWaiting']
                    socket.emit("TABLE-SERVICED", order)
                    order.save()
                }
            })
    })
}

module.exports = {
    orderSocket: orderSocket
}
