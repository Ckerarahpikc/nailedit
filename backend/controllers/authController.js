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
    secure: process.env.NODE_ENV === "production",
  });

  // remove the password from the output (json)
  user.password = undefined;

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

exports.protect = catchPromise(async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      next(new SetUpError("You are not logged in. Please log in.", 401));
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user)
      next(
        new SetUpError(
          "The current user token has been expired. Please log in again.",
          401
        )
      );

    const isTokenInvalid = user.checkPasswordChangedAfterTokenExpired(
      decoded.exp
    );
    if (isTokenInvalid) {
      next(
        new SetUpError(
          "Your password has been changed recently. Please log in again.",
          401
        )
      );
    }

    // this will allow us to use user data from server side
    req.user = user;
    next();
  } catch (error) {
    next(new SetUpError("Invalid token. Please log in again.", 401));
  }
});
