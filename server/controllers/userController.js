// import respective utilities
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const catchPromise = require("../utils/catchPromise");
const SetUpError = require("../utils/errorConfig");
const UserService = require("../services/userService");

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
      new SetUpError("Input file contains unsupported image format.", 400),
      false
    );
  }
};

// apply multer storage and filter
const multerUpload = multer({
  storage,
  fileFilter: filter,
});

// create middleware for file upload
exports.updateUserPhoto = multerUpload.single("photo");

// update 'updateMe' function to handle photo upload and user update
exports.updateMe = catchPromise(async (req, res, next) => {
  const { name, email } = req.body || {};

  // 1. get ready upload directory
  const uploadsDir = path.join(__dirname, "../uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // 2. process image (if provided) but DO NOT delete old photo yet
  const { file } = req;
  let photoFileName;
  let outputPath;
  if (file) {
    photoFileName = `user-${req.user._id}-${Date.now()}.jpeg`;
    outputPath = path.join(uploadsDir, photoFileName);

    await sharp(file.path)
      .resize(300, 300)
      .toFormat("jpeg")
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    // remove multer temp file regardless of success
    fs.unlinkSync(file.path);
  }

  // 3. validate email uniqueness (if changing)
  if (email && email !== req.user.email) {
    const emailTaken = await UserService.emailExists(email, req.user._id);
    if (emailTaken) {
      // clean up newly created image file, if any
      if (photoFileName && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      return next(new SetUpError("Email is already in use.", 400));
    }
  }

  // 4. build update object with only provided fields
  const updateData = {};
  if (typeof name === "string" && name.trim() !== "") updateData.name = name;
  if (typeof email === "string" && email.trim() !== "") updateData.email = email;
  if (photoFileName) updateData.photo = photoFileName;

  // if nothing to update, return early
  if (Object.keys(updateData).length === 0) {
    return res.status(200).json({
      status: "success",
      message: "Nothing to update",
      user: req.user,
    });
  }

  // 5. update user in the correct collection using userType from JWT
  const userType = req.user.userType;
  const user = await UserService.updateById(req.user._id, userType, updateData);

  if (!user) {
    // rollback photo if we created one
    if (photoFileName && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    return next(new SetUpError("User not found for update.", 404));
  }

  // 6. if photo changed, delete the old photo (after successful DB update)
  if (photoFileName && req.user.photo && req.user.photo !== "default.png") {
    const oldPhotoPath = path.join(uploadsDir, req.user.photo);
    if (fs.existsSync(oldPhotoPath)) {
      try { fs.unlinkSync(oldPhotoPath); } catch (_) {}
    }
  }

  res.status(200).json({
    status: "success",
    message: "Current user updated successfully",
    user,
  });
});
