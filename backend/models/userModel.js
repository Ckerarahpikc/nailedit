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

const User = model("users", userSchema);
module.exports = User;
