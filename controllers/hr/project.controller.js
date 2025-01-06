const companyModel = require("../../models/company/companyIndex.model");

//////////////////////////////////// Admin Controllers ///////////////////////////////////////////

// Add a new project
const addProject = async (req, res) => {
  try {
    const { project_Name, project_Department, project_Creator } = req.body;

    // Validate required fields
    if (!project_Name || !project_Department || !project_Creator) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    // Check if the project already exists
    const existingProject = await companyModel.Project.findOne({ project_Name });
    if (existingProject) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Project already exists",
      });
    }

    // Create a new project
    const newProject = await companyModel.Project.create({
      project_Name,
      project_Department,
      project_Creator,
      project_Employees: [],
      project_Progress: 0, 
    });

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Project created successfully",
      information: {
        createdProject: newProject,
      },
    });
  } catch (error) {
    console.error("Error creating project:", error);
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

// Add an employee to a project
const addProjectEmployee = async (req, res) => {
  try {
    const { project_Name, employee_Id, employee_Role } = req.body;

    // Validate required fields
    if (!project_Name || !employee_Id || !employee_Role) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "All fields required",
      });
    }

    // Find the project by name
    const project = await companyModel.Project.findOne({ project_Name });
    if (!project) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Project not found",
      });
    }

    // Add the employee to the project's employee list
    project.project_Employees.push({
      employee_Id,
      employee_Role,
    });

    await project.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Employee added to project successfully",
      information: project,
    });
  } catch (error) {
    console.error("Error adding employee to project:", error);
    return res
      .status(500)
      .json({ success: false, status: 500, message: error.message });
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await companyModel.Project.find();

    if (!projects || projects.length === 0) {
      return res.status(200).json({
        success: true,
        status: 404,
        message: "No projects found",
        information: [],
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Projects and employees retrieved successfully",
      information: projects,
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
