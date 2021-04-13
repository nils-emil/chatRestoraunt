const orderSocketWrapper = require('./orderSocket')
const socket = require('socket.io')

const sockets = (server) => {
    global.activeConnections = []
    const io = socket(server)
    console.log("Socket established. Waiting for connection")
    io.on('connection', (socket) => {
        global.activeConnections.push(socket)
        orderSocketWrapper.orderSocket(socket, io)
        socket.on('disconnect', function () {
            global.activeConnections = global.activeConnections.filter(e => e.id !== socket.id)
        });
    })
    return io;
}

module.exports = {
    sockets: sockets
}
