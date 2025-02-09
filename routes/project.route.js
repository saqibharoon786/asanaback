const express = require('express');
const router = express.Router();
const controller=require('../controllers/index.controller')

// Create a new project
router.post('/create-project', controller.project.createProject);

//Get all projects
router.get('/get-allproject', controller.project.getAllProjects);

// Get a single project by ID
router.get('/getbyid/:id', controller.project.getProjectById);

// // Update a project by ID
// router.put('/projects/:id', controller.updateProject);

// // Soft delete a project
// router.delete('/projects/:id', controller.deleteProject);

module.exports = router;
