const express = require("express");
const projectModel = require("../models/company/companyIndex.model");

const addProject = async (req, res) => {
  try {
    const { project_Name, project_Department } = req.body;

    // Check for required fields
    if (!project_Name || !project_Department) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    const existingProject = await projectModel.Project.findOne({
      project_Name,
    });

    if (existingProject) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Project already exists",
      });
    }

    const existingDepartment = await projectModel.Department.findOne({
      department_Name: project_Department,
    });

    if (!existingDepartment) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Department does not exist!!!",
      });
    }

    const newProject = await projectModel.Project.create({
      project_Name,
      project_Department,
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Project created successfully",
      information: {
        createdProject: {
          name: newProject,
        },
      },
    });
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

const addProjectEmployee = async (req, res) => {
  try {
    const { project_Name, employee_Name, employee_Email, employee_Role } =
      req.body;

    // Validate required fields
    if (!project_Name || !employee_Name || !employee_Email || !employee_Role) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    // Find the project by name
    const project = await projectModel.Project.findOne({
      project_Name,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Project not found",
      });
    }

    // Check if the employee is already assigned to the project
    const existingEmployee = project.project_Employees.find(
      (emp) => emp.employee_Email === employee_Email
    );

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Employee already assigned to this project",
      });
    }

    // Add the employee to the project's employee list
    project.project_Employees.push({
      employee_Name,
      employee_Role,
      employee_Email,
    });

    await project.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Employee added to project successfully",
      information: {
        project,
      },
    });
  } catch (error) {
    console.error("Error adding employee to project:", error);
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // Fetch all projects, including the embedded 'project_Employees' field
    const projects = await projectModel.Project.find();

    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No projects found",
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Projects and employees retrieved successfully",
      information: {
        projects,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};
const project = {
  addProject,
  addProjectEmployee,
  getAllProjects,
};

module.exports = project;
