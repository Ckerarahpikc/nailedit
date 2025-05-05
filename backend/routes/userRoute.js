const router = require("express").Router();

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.get("/check-session", authController.checkSession);

router.use(authController.protect);

router.post(
  "/updateMe",
  userController.updateUserPhoto,
  userController.updateMe
);

module.exports = router;
