const companyModel = require('../models/company/companyIndex.model');
const express = require("express");


// Create a New Project
const createProject = async (req, res) => {
  try {
    const { companyId, project_Id, project_Name, project_Description, Project_TeamLead, Project_TeamMembers, Project_Tasks, Project_Files } = req.body;

    const newProject = await companyModel.Project.create({
      companyId,
      project_Id,
      project_Name,
      project_Description,
      Project_TeamLead,
      Project_TeamMembers,
      Project_Tasks,
      Project_Files,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ message: 'Error creating project', error: err.message });
  }
};

// Get All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await companyModel.Project.find({ deleted: false });
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
};

// Get a Single Project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await companyModel.Project.findById(id)
      .populate('Project_TeamLead Project_TeamMembers Project_Tasks');  // Populate referenced fields
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ project });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
};

// Update a Project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_Name, project_Description, Project_TeamLead, Project_TeamMembers, Project_Tasks, Project_Files } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { project_Name, project_Description, Project_TeamLead, Project_TeamMembers, Project_Tasks, Project_Files },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (err) {
    res.status(500).json({ message: 'Error updating project', error: err.message });
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
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully', project: deletedProject });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting project', error: err.message });
  }
};
 const project={
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
 }
 module.exports=project;