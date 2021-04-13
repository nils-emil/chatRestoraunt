const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let dbUrl = 'mongodb://' + process.env.DATABASE_URL + '/app';
const connection = mongoose.connect(dbUrl, {useNewUrlParser: true}).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    }
);

module.exports.connection = connection;
