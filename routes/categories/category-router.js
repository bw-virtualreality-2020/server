//imports
const Categories = require('./category-model')

//router
const router = require('express').Router()

async function validateId(req, res, next) {
    const id = req.params.id
    try {
        const category = await Categories.findById(id)
        if (!category) {
            res.status(404).json({ message: `Category with id ${id} not found.` })
        } else {
            req.category = category
            next()
        }
    } catch (err) {
        next(err)
    }
}

function validateCategory(req, res, next) {
    const { category_name } = req.body
    if (!category_name) {
        res.status(400).json({ message: 'Must include category name.' })
    } else {
        next()
    }
}

//endpoints
//[GET] /projects
router.get('/', async (req, res, next) => {
    try {
        const categories = await Categories.find()
        res.status(200).json({ categories })
    } catch (err) {
        next(err)
    }
})

//[GET] /projects/:id
router.get('/:id', validateId, (req, res) => {
    res.status(200).json({ category: req.category })
})

//[POST] /projects
router.post('/', validateCategory, async (req, res, next) => {
    try {
        const category = await Categories.add(req.body)
        res.status(201).json({ category })
    } catch (err) {
        next(err)
    }
})

//error handling middleware
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message, stack: err.stack, errno: err.errno, code: err.code })
})

//exports
module.exports = router