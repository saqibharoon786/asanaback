const mongoose = require("mongoose");

// Goal Schema
const goalSchema = new mongoose.Schema({
  subgoal: {
    type: String,
  },
  goalTitle: {
    type: String,
  },
  goalOwner: {
    type: String,
  },
  timePeriod: {
    type: String,
  },
  privacy: {
    type: String,
    enum: ["public", "private", "restricted"], // Make sure "private" is listed
    required: true,
  },
  members: [
    {
      type: String,
    },
  ],

  status: {
    type: String,
  },

  summary: {
    type: String,
  },

  statusupdate:{
    type:String,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
