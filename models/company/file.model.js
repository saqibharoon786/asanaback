const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
  File_FileName: { type: String, required: true },
  File_FilePath: { type: String, required: true }, // Path to the file on the server
  File_FileType: { type: String, required: true }, // MIME type (image, document, etc.)
  File_TaskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }, // Optional: Link to Task
  File_ProjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Optional: Link to Project
  File_CreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to Employee who uploaded the file
  File_CreatedAt: { type: Date, default: Date.now }
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
