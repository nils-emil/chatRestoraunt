const Table = require('../models/table').Table

module.exports = class CategoryService {

    async fetchAll() {
        return Table.find()
            .then(tables => {
                return tables
            })
    }

}
