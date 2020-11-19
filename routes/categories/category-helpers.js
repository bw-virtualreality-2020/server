//imports
const Categories = require('./category-model')

//middleware
async function validateCategoryId(req, res, next) {
    const id = req.params.id || req.params.category_id
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

//exports
module.exports = {
    validateCategoryId,
    validateCategory
}