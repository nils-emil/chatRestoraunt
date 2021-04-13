const express = require('express')
const router = express.Router({mergeParams: true})

const CategoryService = require('../../services/categoryService')
const categoryService = new CategoryService()

router.route('/').get(async function (req, res) {
    const categories = await categoryService.fetchAll( false)
    res.json(categories)
})

module.exports = router
