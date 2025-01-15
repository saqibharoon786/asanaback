const companyModel = require("../models/company/companyIndex.model"); 
const moment = require("moment-timezone");

const createEvent = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const userId = req.user.userId;
    const { event_Title, end_Time, event_Description } = req.body;

    const savedEvent = await companyModel.Event.create({
      event_Title, 
      end_Time: end_Time,
      event_Description, 
      companyId,
      userId,
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: savedEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};





// Get All Calendar Events for a Specific Company
const getAllEvents = async (req, res) => {
  try {
    const companyId = req.user.companyId;

    const events = await companyModel.Event.find({ companyId,  deleted: false  });
    return res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { eventId } = req.params;

    // Fetch the event using eventId and companyId
    const event = await companyModel.Event.findOne({
      _id: eventId,
      companyId,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No Event found.",
        information: { event: [] },
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Event retrieved successfully.",
      information: { event },
    });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const companyId = req.user.companyId; // Extract company ID from authenticated user
    const { eventId } = req.params; // Extract event ID from request params
    const {
      event_Title,
      start_Time,
      end_Time,
      event_Description,
    } = req.body; // Destructure fields to update from request body

    // Find the event by ID and company ID to ensure the event belongs to the company
    const event = await companyModel.Event.findOne({ _id: eventId, companyId });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Update the event fields if provided in the request body
    if (event_Title) event.event_Title = event_Title;
    if (start_Time) event.start_Time = new Date(start_Time);
    if (end_Time) event.end_Time = new Date(end_Time);
    if (event_Description) event.event_Description = event_Description;

    // Save the updated event
    const updatedEvent = await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      information: {
        updatedEvent,
      },
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a Calendar Event by ID (with Company Validation)
const deleteEvent = async (req, res) => {
  try {
    const companyId = req.user.companyId;
    const { eventId } = req.params;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Please provide the event ID.",
      });
    }

    // Find the event by ID and company ID
    const event = await companyModel.Event.findOne({
      companyId,
      _id: eventId,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // Mark the event as deleted by updating the 'deleted' field to true
    await companyModel.Event.updateOne(
      { _id: eventId },
      { $set: { deleted: true } }
    );

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "An error occurred while deleting the event.",
    });
  }
};

//Get EVent By UserId 
const getEventsByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get the current date and time
    const currentTime = new Date();

    // Fetch events where either time has passed or event_Read is false
    const events = await companyModel.Event.find({
      userId: userId,
      $or: [
        { end_Time: { $lt: currentTime } }, 
        { event_Read: false },             
      ],
    });

    if (!events || events.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "No matching events found.",
        information: { events: [] },
      });
    }

    // Respond with the matched events
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Matching events retrieved successfully.",
      information: { events },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { eventId } = req.params;

    const updatedEvent = await companyModel.Event.findOneAndUpdate(
      { _id: eventId },
      { marked_As_Read: true },
      { new: true } 
    );

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: updatedEvent, // Return updated notification details
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Export the controller functions
const event = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsByUserId,
  markAsRead,
};

module.exports=event