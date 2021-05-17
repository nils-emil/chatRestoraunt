const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UiConfurationSchema = new Schema({
    key: {
        type: String
    },
    value: {
        type: String
    }
});

module.exports.UiConfuration = mongoose.model('UiConfuration', UiConfurationSchema);
