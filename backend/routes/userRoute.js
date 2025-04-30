const router = require("express").Router();

const authController = require("../controllers/authController");
const adminController = require("../controllers/settingsController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/check-session", authController.checkSession);

router.get(
  "/settings",
  authController.protect,
  authController.restrictTo("admin", "moderator"),
  adminController.getSettings
);
router.patch(
  "/settings",
  authController.protect,
  authController.restrictTo("admin", "moderator"),
  adminController.updateSettings
);

module.exports = router;
