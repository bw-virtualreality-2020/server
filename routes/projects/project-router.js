//imports
const Projects = require('./project.model')
const { validateId, validateProject, validateChanges } = require('./project-helpers')

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

//[POST] /projects
router.post('/', validateProject, async (req, res, next) => {
    try {
        const project = await Projects.add(req.body)
        res.status(201).json({ project })
    } catch (err) {
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