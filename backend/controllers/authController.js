const catchPromise = require("../utils/catchPromise");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const SetUpError = require("../utils/errorConfig");
const User = require("../models/userModel");
const ms = require("ms");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

const createUser = (user, statusCode, res) => {
  // create token
  const newToken = signToken(user._id);

  // create a cookie
  res.cookie("jwt", newToken, {
    expires: new Date(Date.now() + ms(process.env.JWT_COOKIE_EXPIRES_IN)),
    httpOnly: true,
  });

  // remove the password from the output (json)
  user.password = undefined;

  console.log("token:", newToken);

  // combine token with user and return
  res.status(statusCode).json({
    status: "success",
    token: newToken,
    data: { user },
  });
};

exports.login = catchPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new SetUpError("The email and password field are required.", 400)
    );
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.checkPasswords(password, user.password))) {
    return next(new SetUpError("Email or password incorrect.", 400));
  }

  createUser(user, 200, res);
});

exports.register = catchPromise(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword)
    return next(
      new SetUpError(
        "All fields are required. Please try again after you filled them."
      ),
      409
    );

  try {
    const newUser = await User.create({
      name,
      email,
      password,
      confirmPassword,
    });

    createUser(newUser, 201, res);
  } catch (error) {
    if (error.code === 11000)
      return next(
        new SetUpError("Email is already in use. Please log in instead."),
        400
      );
    next(error);
  }
});
