const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  Task_Title: { type: String, required: true },
  TAsk_Description: { type: String },
  Task_Assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Employee
  Task_Status: { 
    type: String, 
    enum: ['to-do', 'in-progress', 'completed'], 
    default: 'to-do' 
  },
  Task_DueDate: { type: Date },
  Task_Files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }], // Associated files for the task
  Task_Notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }], // Associated notes for the task
},
{
    timestamps: true,
  
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
