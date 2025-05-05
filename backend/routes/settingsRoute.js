const router = require("express").Router();
const authController = require("../controllers/authController");
const settingsController = require("../controllers/settingsController");

router.use(authController.protect);

router.get(
  "/getSettings",
  authController.restrictTo("admin", "moderator"),
  settingsController.getSettings
);
router.patch(
  "/updateSettings",
  authController.restrictTo("admin", "moderator"),
  settingsController.updateSettings
);

module.exports = router;
