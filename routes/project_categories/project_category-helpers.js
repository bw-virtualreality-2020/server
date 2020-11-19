//imports
const ProjectCategories = require('./project_category-model')

//middlware
async function validateProjectCategory(req, res, next) {
    const project_id = req.params.id
    const category_id = req.body.category_id
    try {
        if (!category_id) {
            res.status(400).json({ message: 'Must provide category_id' })
        } else {
            const [projectCategory] = await ProjectCategories.findBy({ 'project_id': project_id, 'category_id': category_id })
            if (!projectCategory) {
                next()
            } else {
                res.status(400).json({ message: `Project already belongs to category ${category_id}` })
            }
        }
    } catch (err) {
        next(err)
    }
}

//exports
module.exports = {
    validateProjectCategory
}