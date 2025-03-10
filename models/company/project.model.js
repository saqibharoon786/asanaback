const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  companyId: { type: String },
  project_Name: { type: String },
  project_Description: { type: String },
  project_Creator: { type: String },
  project_Department: { type: String, required: true }, // Changed from ObjectId to String
  project_TeamMembers: [{ type: String }],
  project_Tasks: [{ type: String }],
  project_StartedDate: { type: String },
  project_DueDate: { type: String }, // ✅ Fixed typo from 'poject_DueDate'
  project_Status: {
    type: String,
    enum: ["active", "completed", "archived"],
    default: "active",
  },
  deleted: { type: Boolean, default: false },
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
