// import respective utilities
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const catchPromise = require("../utils/catchPromise");
const SetUpError = require("../utils/errorConfig");
const User = require("../models/userModel");

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const actualFile = uniqueSuffix + path.extname(file.originalname);
    cb(null, actualFile);
  },
});

// set up multer's filter
const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new SetUpError(
        "Image format is not correct. Please upload an image.",
        400
      ),
      false
    );
  }
};

// apply multer storage and filter
const multerUpload = multer({
  storage,
  filter,
});

// create middleware for file upload
exports.updateUserPhoto = multerUpload.single("photo");

// update 'updateMe' function to handle photo upload and user update
exports.updateMe = catchPromise(async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // use sharp to configure the image
    const { file } = req;
    console.log("file:", file);
    let photoFileName;
    let outputPath;
    if (file) {
      // review:
      photoFileName = `user-${req.user._id}-${Date.now()}.jpeg`;
      outputPath = path.join(__dirname, "../uploads", photoFileName);
      console.log(outputPath);

      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      const oldPhotoPath = path.join(__dirname, "../uploads", file.filename);
      // deleting the old user photo
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      }

      // deleting the original file
      if (req.user.photo) {
        fs.unlinkSync(file.path);
      }
    }

    // optionally delete the old photo (here you could add a timer interval where user were have some time to undo the image if they didn't like the new one after that we could delete the originalOne, meaning all users will occupy only one file as a photo inside uploads folder)

    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        photo: photoFileName,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      message: "Current user updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
});
