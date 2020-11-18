//imports
const Projects = require('./project.model')

//middleware
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

//exports
module.exports = {
    validateId,
    validateProject
}