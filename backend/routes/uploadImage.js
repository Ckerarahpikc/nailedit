const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");
const SetUpError = require("../utils/errorConfig");

const User = require("../models/userModel");
const authController = require("../controllers/authController");

// STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const actualFile = uniqueSuffix + path.extname(file.originalname);
    console.log("file:", file);
    cb(null, actualFile);
  },
});

// review: APPLYING DESTINATION
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new SetUpError("File format is not correct", 400), false);
    }
  },
});

// ROUTER INCOMMING REQUESTS HANDLING
router.post(
  "/uploadPicture",
  authController.protect,
  authController.restrictTo("all"),
  upload.single("photo"),
  async (req, res, next) => {
    try {
      const userId = req.user._id;
      console.log(userId);
      console.log(req.user);
      const filename =
        Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(req.file.originalname);
      const inputPath = req.file.path;
      const outputPath = path.join(__dirname, "../uploads", filename);

      // review: resizing and converting to jpeg
      await sharp(inputPath)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 100 })
        .toFile(outputPath);

      // review: delete the original image / keep the new one
      fs.unlinkSync(inputPath);

      await User.findByIdAndUpdate(userId, { photo: filename }, { new: true });

      res.status(200).json({
        status: "success",
        message: "Profile picture uploaded successfully.",
        filename,
        url: `/uploads/${filename}`,
      });
    } catch (err) {
      next(new SetUpError(err.message, 400));
    }
  }
);

module.exports = router;
