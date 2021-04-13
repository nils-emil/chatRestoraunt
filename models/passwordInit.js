const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PasswordInitSchema = new Schema({
    key: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
})

module.exports.PasswordInit = mongoose.model('PasswordInit', PasswordInitSchema);
