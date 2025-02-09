const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  Note_Content: { type: String, required: true },
  Note_CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Employee who created the note
  Note_TaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Reference to the Task
  Note_ProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Reference to the Project
  Note_Type: { 
    type: String, 
    enum: ['personal', 'shared'], 
    default: 'personal' 
  }, // Personal or Shared notes
  Note_CreatedAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
