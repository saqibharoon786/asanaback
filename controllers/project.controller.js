const companyModel = require("../models/company/companyIndex.model");
const express = require("express");

// Create a New Project
const createProject = async (req, res) => {
  // Ensure user is authenticated
  const user = req.user;
  if (!user) {
    console.log("User not found in request.");
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { project_Name, project_Privacy } = req.body;

  try {
    // Create the new project using user.access (a string like "Admin")
    const newProject = await companyModel.Project.create({
      project_Name,
      project_Creator: user.userId,
      project_Privacy,
      project_Department: user.access,
    });

    // Respond with the created project data (no need to populate)
    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating project",
      error: err.message,
    });
  }
};

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await companyModel.Project.find({ deleted: false });
    res.status(200).json({ projects });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching projects", error: err.message });
  }
};

// Get a Single Project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await companyModel.Project.findOne({ _id: id }); // Populate referenced fields
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching project", error: err.message });
  }
};

//Get Project BY User Id
const getProjectByUserId = async (req, res) => {
  const user = req.user;
  if (!user) {
    console.log("User not found in request.");
    return res.status(401).json({ message: "User not authenticated" });
  }
  if (user.access == "Admin") {
    const projects = await companyModel.Project.find({ deleted: false });
    res.status(200).json({
      message: "Admin Fetch All Projects",
      projects,
    });
  }

  try {
    // Find projects where the user is the creator or is included in the project team members
    const projects = await companyModel.Project.find({
      $or: [
        { project_Creator: user.userId },
        { project_TeamMembers: user.userId },
      ],
    });
    if (!projects || projects.length === 0) {
      return res.status(200).json({
        message: "You're not added and not create any project",
      });
    }

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching projects with respect to user",
      error: err.message,
    });
  }
};

// Update a Project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      project_Name,
      project_Description,
      Project_TeamLead,
      Project_TeamMembers,
      Project_Tasks,
      Project_Files,
    } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        project_Name,
        project_Description,
        Project_TeamLead,
        Project_TeamMembers,
        Project_Tasks,
        Project_Files,
      },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating project", error: err.message });
  }
};

// Soft Delete a Project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting project", error: err.message });
  }
};
const project = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectByUserId,
};
module.exports = project;
