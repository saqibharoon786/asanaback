const mongoose = require("mongoose");
const companyModel = require("../models/company/companyIndex.model");
const Project = require("../models/company/project.model");

const createTask = async (req, res) => {
  try {
    console.log("🟢 Incoming Request Body:", req.body);

    const {
      project_Id,
      Task_Title,
      Task_Description,
      Task_AssignedTo,
      Task_Status,
      Task_CreatedOn,
      Task_CompletedDate,
      Task_DueDate,
      Task_Files,
      Task_Notes,
    } = req.body;

    // 🛑 Check if project_Id is missing
    if (!project_Id) {
      console.log("⛔ ERROR: project_Id is missing in request body");
      return res.status(400).json({ message: "project_Id is required" });
    }

    console.log("🔍 Searching for project with ID:", project_Id);

    // ✅ Fetch project from database
    const project = await companyModel.Project.findOne({ _id: project_Id });

    if (!project) {
      console.log(`❌ ERROR: No project found with ID ${project_Id}`);
      return res
        .status(400)
        .json({ message: "Invalid project ID", project_Id });
    }

    console.log("✅ Project found:", project);

    // ✅ Check if user is the project creator
    if (!project.project_Creator) {
      console.log("⛔ ERROR: project_Creator is missing in database");
      return res
        .status(500)
        .json({ message: "Project creator not found in database" });
    }

    if (String(project.project_Creator) !== String(req.user.userId)) {
      console.log("⛔ ERROR: User is not the project creator");
      return res.status(403).json({
        message: "Only the project creator can assign tasks.",
      });
    }

    // ✅ Format the task data
    const formattedTask = {
      project_Id,
      Task_Title,
      Task_Description,
      Task_AssignedBy: req.user.userId,
      Task_AssignedTo: Array.isArray(Task_AssignedTo) ? Task_AssignedTo : [],
      Task_Status: Task_Status || "Pending",
      Task_CreatedOn: Task_CreatedOn ? new Date(Task_CreatedOn) : new Date(),
      Task_CompletedDate: Task_CompletedDate
        ? new Date(Task_CompletedDate)
        : null,

      Task_DueDate: Task_DueDate ? new Date(Task_DueDate) : null,
      Task_Files: Array.isArray(Task_Files) ? Task_Files : [],
      Task_Notes: Array.isArray(Task_Notes) ? Task_Notes : [],
      Task_CreatedBy: req.user.userId,
    };

    console.log("🟢 Task data ready for insertion:", formattedTask);

    // ✅ Create the new task
    const newTask = await companyModel.Task.create(formattedTask);

    console.log("✅ Task created successfully:", newTask);

    res.status(201).json({
      message: "Task successfully created",
      task: newTask,
    });
  } catch (err) {
    console.error("🔥 ERROR creating task:", err);
    res.status(500).json({
      message: "An error occurred while creating the task",
      error: err.message,
    });
  }
};

const getAllTaskByProjectId = async (req, res) => {
  try {
    // console.log("Request Params:", req.params); // Debugging step

    const { projectId } = req.params; // Ensure this matches your route

    // Fetch project details (without populate)
    const project = await companyModel.Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Fetch creator details manually
    const creator = await companyModel.User.findById(project.creator).select(
      "name"
    );

    // Fetch assigned users manually
    const assignedUsers = await companyModel.User.find({
      _id: { $in: project.assignedUsers },
    }).select("name");

    // Fetch all tasks related to the project
    const tasks = await companyModel.Task.find({ project_Id: projectId });

    if (!tasks || tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No tasks found for this Project ID" });
    }

    res.status(200).json({
      message: "Fetched all tasks successfully by Project ID",
      project: {
        _id: project._id,
        name: project.name,
        creator: creator || null,
        assignedUsers: assignedUsers || [],
      },
      tasks,
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({
      message: "An error occurred while fetching the tasks",
      error: err.message,
    });
  }
};

//Updated Task controller//

const updateTask = async (req, res) => {
  try {
    let { _id } = req.params;
    _id = _id.trim(); // ✅ Remove any extra spaces or newlines

    console.log("Received _id:", _id); // Debugging

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid Task _id format" });
    }

    const updateData = req.body;
    const updatedTask = await companyModel.Task.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task successfully updated",
      task: updatedTask,
    });
  } catch (err) {
    console.error("🔥 ERROR updating task:", err);
    res.status(500).json({
      message: "An error occurred while updating the task",
      error: err.message,
    });
  }
};

//update the task//

// Exporting the createTask function
module.exports = { createTask, getAllTaskByProjectId, updateTask };
