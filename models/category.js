const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
});

module.exports.Category = mongoose.model('Category', CategorySchema);
