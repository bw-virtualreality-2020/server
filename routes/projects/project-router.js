//imports
const Projects = require('./project.model')
const Categories = require('../categories/category-model')
const ProjectCategories = require('../project_categories/project_category-model')
const { validateId, validateProject, validateChanges } = require('./project-helpers')
const { validateProjectCategory } = require('../project_categories/project_category-helpers')

//router
const router = require('express').Router()

//endpoints
//[GET] /projects
router.get('/', async (_req, res, next) => {
    try {
        const projects = await Projects.find()
        res.status(200).json({ projects })
    } catch (err) {
        next(err)
    }
})

//[GET] /projects/:id
router.get('/:id', validateId, (req, res) => {
    res.status(200).json({ project: req.project })
})

//[GET] /projects/:id/categories
router.get('/:id/categories', validateId, async (req, res, next) => {
    try {
        const categories = await ProjectCategories.getById(req.params.id)
        res.status(200).json({ categories })
    } catch (err) {
        next(err)
    }
})

//[POST] /projects
router.post('/', validateProject, async (req, res, next) => {
    try {
        const project = await Projects.add(req.body)
        res.status(201).json({ project })
    } catch (err) {
        next(err)
    }
})

//[POST] /projects/:id/categories
router.post('/:id/categories', validateId, validateProjectCategory, async (req, res, next) => {
    try {
        const category = await Categories.findById(req.body.category_id)
        if(!category) {
            res.status(404).json({ message: `Category with id ${req.body.category_id} not found.` })
        } else {
            const projectCategory = await ProjectCategories.add({ project_id: req.params.id, category_id: req.body.category_id })
            res.status(201).json({ projectCategory })
        }
    } catch (err) {
        console.log(err)
        next(err)
    }
})

//[PUT] /projects:id
router.put('/:id', validateId, validateChanges, async (req, res, next) => {
    const { id } = req.params
    try {
        const updatedProject = await Projects.update(id, req.body)
        res.status(200).json({ updatedProject })
    } catch (err) {
        next(err)
    }
})

//[DELETE] /projects/:id
router.delete('/:id', validateId, async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedProjects = await Projects.remove(id)
        res.status(200).json({ deletedProjects })
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