const Order = require('../models/order').Order


//TODO emit to other active sockets the item itself
const orderSocket = (socket, io) => {
    console.log("Connection ready")
    socket.on('MARK_ORDER_SERVICED', function (data) {
        Order.findOne({_id: data._id},
            (err, order) => {
                if (order) {
                    order['isWaiting'] = order && !order['isWaiting']
                    order.save()
                }
            })
    })
}

module.exports = {
    orderSocket: orderSocket
}
