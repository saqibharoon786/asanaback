const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    companyId: { type: String },
    peoject_Id: { type: String },
    project_Name: { type: String },
    project_Description: { type: String, },
    Project_TeamLead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    Project_TeamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    Project_Tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    Project_Files: [{ filePath: { type: String } }],
    deleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;