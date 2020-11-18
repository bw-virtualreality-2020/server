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

function validateProject(req, res, next) {
    const { project_name, project_goal } = req.body
    if (!project_name) {
        res.status(400).json({ message: 'Must include project name.' })
    } else if (project_goal && typeof project_goal !== 'number' || typeof project_goal === 'string' || Math.sign(project_goal) === -1) {
        res.status(400).json({ message: 'Project goal must be positive decimal number.' })
    } else {
        next()
    }
}

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
router.put('/:id', validateId, validateProject, async (req, res, next) => {
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
        const updatedProject = await Projects.update(id, req.body)
        res.status(200).json({ updatedProject })
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