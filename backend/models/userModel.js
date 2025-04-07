const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name."],
    trim: true,
    maxLength: [50, "Name must be less than or equal to 50 characters."],
  },
  email: {
    type: String,
    validate: {
      validator: (val) => {
        return validator.isEmail(val);
      },

      message: "You should use a real email.",
    },
  },
  password: {
    type: String,
    required: [true, "User must include a password."],
    minLength: 6,
    maxLength: 20,
    // hide from db
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "User must include a confirmation password."],
    validate: {
      validator: function (val) {
        // This only works on CREATE and SAVE
        return val === this.password;
      },
      message: "Passwords should match.",
    },
  },
  photo: {
    type: String,
    default: "defaultAv.jpg",
  },
  status: {
    type: String,
    enum: ["admin", "moderator", "client"],
    default: "client",
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  // hash the password if it was modified
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUNDS, 10)
    );
    this.confirmPassword = undefined; // no need to store after registration so get undefined
  }

  // update passwordChangedAt if the password was modified and the document is not new
  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 5000;
  }

  next();
});

userSchema.methods.checkPasswords = async (password, cryptedPassword) => {
  const isTheSame = await bcrypt.compare(password, cryptedPassword);

  // true if all good
  return isTheSame;
};

userSchema.methods.checkPasswordChangedAfterTokenExpired = (jwtTimestamp) => {
  // 1. check if password was even changed
  if (this.passwordChangedAt) {
    // the time when user changed his password
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    // 2. check if password was changed after the token has been expired
    if (changedAt > jwtTimestamp) {
      // if the user changed his password after the token was created, which means changedAt > jwttimestamp in milliseconds, in this case the token is no longer valid and should be deleted
      return true;
    }
  }

  // otherwise return false, meaning token is still valid
  return false;
};

const User = model("users", userSchema);
module.exports = User;
