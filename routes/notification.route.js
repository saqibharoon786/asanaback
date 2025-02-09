// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const controller=require("../controllers/index.controller")

// POST /api/notifications
router.post("/create-notification",
    controller.notification.createNotification
);

module.exports = router;
