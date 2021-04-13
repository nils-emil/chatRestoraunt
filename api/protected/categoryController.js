const express = require('express')
const router = express.Router({mergeParams: true})
const CategoryService = require('../../services/categoryService')
const categoryService = new CategoryService()
const MenuItem = require('../../models/menuItem').MenuItem

router.route('/').get(async function (req, res) {
    const categories = await categoryService.fetchAll(true)
    res.json(categories)
})

router.route('/add').post(async function (req, res) {
    const category = req.body
    return res.json(await categoryService.save(category))
})

router.route('/update/:id').post(async function (req, res) {
    const category = req.body
    return res.json(await categoryService.update(category))
})

router.route('/delete/:id').delete(function (req, res) {
    categoryService.remove(req.params.id).then(r => {
        console.log(`Removed category with id${req.params.id}`)
        MenuItem.remove({categoryId: req.params.id}, () => {
            console.log("Deleted items related to " +  req.params.id +  "cateory")
        })
    })
    return res.status(204).send()
})

module.exports = router
