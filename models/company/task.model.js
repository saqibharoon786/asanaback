const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    project_Id: { type: String },
    Task_Title: { type: String },
    Task_AssignedBy: { type: String }, // ID of the person assigning the task
    Task_AssignedTo: [{ type: String }], // Array of assigned employee IDs
    Task_DueDate: { type: String }, // Storing as a string (consider using Date type if needed)
    Task_CreatedBy: { type: String }, // ID of the creator
    Task_CreatedOn: { type: String }, // Date of creation
    Task_CompletedDate: { type: String }, // Completion date
    Task_Description: { type: String },
    Task_Status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "On Hold"], // Optional status values
      default: "Pending",
    },
    Task_Files: [{ type: String }], // List of associated files
    Task_Notes: [{ type: String }], // List of notes
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
