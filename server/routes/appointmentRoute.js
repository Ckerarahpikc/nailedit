const router = require("express").Router();
const authController = require("../controllers/authController");
const appointmentController = require("../controllers/appointmentController");

router.use(authController.protect);

router
  .route("/")
  .get(appointmentController.getAllAppointments)
  .post(
    authController.restrictTo("user"),
    appointmentController.createAppointment,
  );

router.get("/available-slots", appointmentController.getAvailableSlots);

router
  .route("/:id")
  .get(appointmentController.getAppointment)
  .patch(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;

