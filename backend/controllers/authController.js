const catchPromise = require("../utils/catchPromise");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const SetUpError = require("../utils/errorConfig");
const User = require("../models/userModel");

const createToken = catchPromise(function () {});

exports.login = catchPromise(async (req, res, next) => {
  const { email, password } = req.body;

  console.log("body:", req.body);

  if (!email || !password) {
    return next(
      new SetUpError("The email and password field are required.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !user.checkPasswords(password, user.password)) {
    return next(new SetUpError("Email or login incorrect. Try again.", 400));
  }

  res.status(200).json({
    status: 200,
    user,
    message: "Successfully logged in.",
  });
});
