const Projects = require('./project.model')

const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.find()
        res.status(200).json({ projects })
    } catch (err) {
        res.status(500).json({ message: err.message, stack: err.stack })
    }
})

module.exports = router