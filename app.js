const express = require('express')
const app = express()
const PORT = 4000

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = require('./config/db').connection
// require('./mockData/dropdb')
// require('./mockData/data')

const server = app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT)
})

const socketWrapper = require('./socket').sockets(server)

function clientErrorHandler (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

app.use(clientErrorHandler);
app.use(require('./api'))
