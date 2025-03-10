const companyModel = require("../models/company/companyIndex.model");
const express = require("express");
const mongoose = require("mongoose"); // ✅ Import mongoose


const creategoal = async (req, res) => {
  const user = req.user;

  if (!user) {
    console.log("User not found in request.");
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { goalTitle, timePeriod, privacy, members, status, statusupdate,Updatemethod,ProgressSource,Measurement, subGoal } =
    req.body; // Removed summary

  try {
    // Ensure privacy is one of the valid enum values
    if (!["public", "private", "restricted"].includes(privacy)) {
      return res.status(400).json({ message: "Invalid value for privacy" });
    }

    const newgoal = await companyModel.goal.create({
      goalTitle,
      goalOwner: user.userId, // This should be passed as the user from req.user
      timePeriod,
      privacy,
      members,
      status,
      statusupdate,
      Updatemethod,
      ProgressSource,
      Measurement, 
      subGoal,
    });

    res.status(201).json({
      message: "Goal created successfully",
      goal: newgoal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating goal",
      error: error.message,
    });
  }
};

///getallgoals
const getallgoals = async (req, res) => {
  try {
    // Fetch goals where deleted is either false or the field does not exist
    const goals = await companyModel.goal.find({
      $or: [{ deleted: false }, { deleted: { $exists: false } }],
    });

    if (goals.length === 0) {
      return res.status(404).json({ message: "No active goals found." });
    }

    res.status(200).json({ goals }); // Return the goals
  } catch (err) {
    res.status(500).json({
      message: "Error fetching goals",
      error: err.message,
    });
  }
};

//getgoalsbyid

const getGoalsById = async (req, res) => {
  try {
    const { id } = req.params; // Fixed typo: 'parms' to 'params'

    const goal = await companyModel.goal.findOne({ _id: id }); // Ensure correct variable name usage

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" }); // Use 404 for not found
    }

    res.status(200).json({ goal });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching goal", error: error.message }); // Fixed variable name from 'err' to 'error'
  }
};
///updtae by goalId
// Controller to update goal status by goalId (using params for both goalId and status)
// Assuming you have a Goal model defined
const updateGoalStatus = async (req, res) => {
  try {
    let { _id } = req.params;

    // Ensure _id exists and handle errors if it's not provided
    if (!_id) {
      return res.status(400).json({ message: "Goal _id is required" });
    }

    _id = _id.trim(); // ✅ Remove any extra spaces or newlines

    console.log("Received _id:", _id); // Debugging

    // Validate _id format for MongoDB ObjectId
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid goal _id format" });
    }

    const updateData = req.body;

    // Ensure 'status', 'summary', and 'statusupdate' are included in the updateData
    if (
      !updateData.status ||
      !updateData.summary ||
      !updateData.statusupdate ||
      typeof updateData.statusupdate !== "string" ||
      !updateData.statusupdate.trim()
    ) {
      return res.status(400).json({
        message: "Status, summary, and a valid statusupdate are required.",
      });
    }

    // Use the correct model (companyModel.goal) and update the goal by _id
    const updatedGoal = await companyModel.goal.findByIdAndUpdate(
      _id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedGoal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.status(200).json({
      message: "Goal successfully updated",
      goal: updatedGoal, // Corrected variable name to updatedGoal
    });
  } catch (err) {
    console.error("🔥 ERROR updating goal:", err);
    res.status(500).json({
      message: "An error occurred while updating the goal",
      error: err.message,
    });
  }
};








const goal = {
  creategoal,
  getallgoals,
  getGoalsById,
  updateGoalStatus,
};

module.exports = goal;
