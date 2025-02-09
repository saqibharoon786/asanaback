// controllers/notificationController.js
const companyModel = require("../models/company/companyIndex.model");
const schedule = require("node-schedule");

const createNotification = async (req, res) => {
  try {
    // Destructure the expected properties from the request body.
    const {
      companyId,
      sender,
      recipients,
      event_Title,
      notification_Time,
      event_Description,
    } = req.body;

    // Create a new notification document and save it in the database.
    const savedNotification = await companyModel.Notification.create({
      companyId,
      sender,
      recipients,
      event_Title,
      notification_Time,
      event_Description,
    });

    // Retrieve the Socket.IO instance that was attached to the Express app.
    const io = req.app.get("socketio");

    // Convert the notification_Time to a Date object.
    const notifyTime = new Date(notification_Time);

    // Schedule the job if the notification time is in the future.
    if (notifyTime > new Date()) {
      // Use the notification _id as the job identifier.
      schedule.scheduleJob(savedNotification._id.toString(), notifyTime, () => {
        // Loop through each recipient and emit the notification.
        savedNotification.recipients.forEach((userId) => {
          io.to(userId).emit("receiveNotification", {
            message: `Reminder: ${savedNotification.event_Title} - ${savedNotification.event_Description}`,
            notification: savedNotification,
          });
        });
        console.log(`Notification ${savedNotification._id} sent at ${new Date()}`);
      });
    } else {
      console.log("Notification time is in the past; no job scheduled.");
    }

    // Return the saved notification in the response.
    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Error creating notification" });
  }
};

module.exports = { createNotification };

const notification = {
    createNotification
}
module.exports = notification
