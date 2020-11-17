//imports
const Projects = require('./project.model')

//router
const router = require('express').Router()

async function validateId(req, res, next) {
    const id = req.params.id
    try {
        const project = await Projects.findById(id)
        if (!project) {
            res.status(404).json({ message: `Project with id ${id} not found.` })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        next(err)
    }
}

//endpoints
//[GET] /
router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.find()
        res.status(200).json({ projects })
    } catch (err) {
        next(err)
    }
})

//[GET] /:id
router.get('/:id', validateId, (req, res) => {
    res.status(200).json({ project: req.project })
})

//error handling middleware
router.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message, stack: err.stack, errno: err.errno, code: err.code })
})

//exports
module.exports = router