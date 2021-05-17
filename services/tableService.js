const Table = require('../models/table').Table

module.exports = class CategoryService {

    async fetchAll() {
        return Table.find()
            .then(tables => {
                return tables
            })
    }

    async createOrUpdateTable(table) {
        var id = table._id;
        delete table._id;
        if (id) {
            Table.update({_id: id}, table, {upsert: true}, function (err) {
                console.log("error on table update")
                console.log(err)
            });
            return
        }
        return new Table(table).save(table)
            .then(tables => {
                return tables
            })
    }

    async delete(id) {
        return Table.remove({_id: id})
            .then(tables => {
                return tables
            })
    }

}
