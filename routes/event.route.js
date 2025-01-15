const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const controller = require("../controllers/index.controller");
const passport = require("../middleware/passportAuth.middleware");
const middleware = require("../middleware/index.middleware");

router.post(
  "/add-event",
  passport.authenticate("jwt", { session: false }),
//   middleware.checkPermission("create"),
  controller.event.createEvent
);

router.get(
  "/get-events",
  passport.authenticate("jwt", { session: false }),
  // middleware.checkPermission("read"),
  controller.event.getAllEvents
);

router.delete(
  "/delete-event/:eventId",
  passport.authenticate("jwt", { session: false }),
  // middleware.checkPermission("delete"),
  controller.event.deleteEvent
);

router.patch(
  "/update-event/:eventId",
  passport.authenticate("jwt", { session: false }),
  // middleware.checkPermission("update"),
  controller.event.updateEvent
);

router.get(
  "/get-event/:eventId",
  passport.authenticate("jwt", { session: false }),
  // middleware.checkPermission("read"),
  controller.event.getEventById
);

router.get(
  '/get-user-events',
  passport.authenticate("jwt",{session:false}),
  //middleware.checkPermission("read"),
  controller.event.getEventsByUserId
)

router.patch(
  "/marked-as-read/:eventId",
  passport.authenticate("jwt", { session: false }),
  // middleware.checkPermission("update"),
  controller.event.markAsRead
);

module.exports = router;
