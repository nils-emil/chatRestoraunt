const User = require('../models/user').User

module.exports = class UserService {

    async fetchAll() {
        return User.find({})
            .then(categories => {
                return categories
            })
    }

    async findById(id) {
        return User.findById(id)
            .then(user => {
                return user
            })
    }

}
