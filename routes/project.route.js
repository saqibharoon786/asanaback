const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");
// Create a new project
router.post(
  "/create-project",
    passport.authenticate("jwt", { session: false }),
  controller.project.createProject
);

//Get all projects
router.get("/get-allproject",
  passport.authenticate("jwt",{session:false}),
  controller.project.getAllProjects);

// Get a single project by ID
router.get(
    "/getbyid/:id",
    passport.authenticate("jwt",{session:false}),
    controller.project.getProjectById

);

//get user project on the basis of id
router.get(
  "/get-user-project-by-id",
  passport.authenticate("jwt",{session:false}),
  controller.project.getProjectByUserId

)

// // Update a project by ID
// router.put('/projects/:id', controller.updateProject);

// // Soft delete a project
// router.delete('/projects/:id', controller.deleteProject);

module.exports = router;