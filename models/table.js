const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    notifications: {
        type: Boolean,
        required: false
    }
})

module.exports.Table = mongoose.model('Table', TableSchema)
