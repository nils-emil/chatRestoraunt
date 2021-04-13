const Category = require('../models/category').Category
const MenuItem = require('../models/menuItem').MenuItem

module.exports = class CategoryService {

    async fetchAll(includeWithoutCategory) {
        return Category.find()
            .sort({order: 1})
            .then(categories => {
                if (includeWithoutCategory) {
                    let unCategorized = {
                        '_id': null,
                        'name': 'Kategooriata',
                        'order': categories.length + 1
                    }
                    return [...categories, unCategorized]
                }
                return categories
            })
    }

    async save(categoryDto) {
        let category = new Category(categoryDto)
        await category.save().then(() => {
            return category
        })
    }

    async remove(id) {
        await Category.findOne({_id: id}).then(category => {
            Category.updateMany({order: {$gt: category.order}}, {$inc: {order: -1}}).then(() => {
            })
        })
        await Category.deleteOne({_id: id}).then(() => {
            MenuItem.updateMany({categoryId: id}, {$set: {categoryId: null}}, {multi: true}, () => {
            })
        })
    }

    async update(categoryDto) {
        let categoryToUpdate = undefined
        console.log(categoryDto)
        await Category.findOne({_id: categoryDto._id}).then(category => {
            categoryToUpdate = category
        })

        async function syncOrderFields(order) {
            let categoryToChangePlace = []
            await Category.find({
                order: order
            })
                .sort({order: 1})
                .then(category => {
                    categoryToChangePlace = category
                })
            await Category.find()
                .sort({order: 1})
                .then(category => {
                    categoryToChangePlace = category
                })
            if (categoryToChangePlace.length !== 1) {
                for (let i = 0; i < categoryToChangePlace.length; i++) {
                    categoryToChangePlace[i].order = i;
                    categoryToChangePlace[i].save()
                }
            }
            return categoryToChangePlace;
        }

        if (categoryToUpdate.order !== categoryDto.order) {
            await syncOrderFields(categoryToUpdate.order);
            await syncOrderFields(categoryDto.order);

            let categoryToChangePlace
            await Category.findOne({
                order: categoryDto.order
            }).then(category => {
                categoryToChangePlace = category
            })
            if (categoryToChangePlace !== null) {
                categoryToChangePlace.order = categoryToUpdate.order
                await categoryToChangePlace.save()
                categoryToUpdate.order = categoryDto.order
            }
        } else {
            categoryToUpdate.name = categoryDto.name
        }

        await categoryToUpdate.save()
        return categoryToUpdate
    }
}
