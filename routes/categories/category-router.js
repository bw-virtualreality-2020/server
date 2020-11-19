//imports
const Categories = require('./category-model')
const { validateCategoryId, validateCategory } = require('./category-helpers')

//router
const router = require('express').Router()

//endpoints
//[GET] /categories
router.get('/', async (req, res, next) => {
    try {
        const categories = await Categories.find()
        res.status(200).json({ categories })
    } catch (err) {
        next(err)
    }
})

//[GET] /categories/:id
router.get('/:id', validateCategoryId, (req, res) => {
    res.status(200).json({ category: req.category })
})

//[GET] /categories/:id/projects
router.get('/:id/projects', async (req, res, next) => {
    try {
        const projects = await Categories.findProjects(req.params.id)
        res.status(200).json({ projects })
    } catch (err) {
        next(err)
    }
})

//[POST] /categories
router.post('/', validateCategory, async (req, res, next) => {
    try {
        const category = await Categories.add(req.body)
        res.status(201).json({ category })
    } catch (err) {
        next(err)
    }
})

//error handling middleware
router.use((err, _req, res, _next) => {
    console.log(err)
    res.status(500).json({ message: err.message, stack: err.stack, errno: err.errno, code: err.code })
})

//exports
module.exports = router