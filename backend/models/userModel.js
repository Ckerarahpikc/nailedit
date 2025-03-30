const { Schema, model } = require("mongoose");
const validator = require("validator");

const userSchema = new Schema({
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
  // confirmPassword: {
  //   type: String,
  //   required: [true, "User must include a confirmation password."],
  //   // this will only work on SAVE / CREATE
  //   validate: {
  //     validator: (val) => {
  //       return val === this.password;
  //     },
  //     message: "Passwords should match.",
  //   },
  // },
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
  // if the password was not modified or either the model is new (meaning it was not changed) then return next()
  if (!this.isModified("password") || this.isNew) return next();

  // if it was indeed modified then update the date when it was changed
  this.passwordChangedAt = Date.now();
  next();
});

userSchema.methods.checkPasswords = (password, cryptedPassword) => {
  console.log("about to compare:", password, "with", cryptedPassword);
  // review: here next I would need to compare it using bcrypt, cuz the cryptedPassword is crypted into the mdb obviously
  return password === cryptedPassword;
};

const User = model("users", userSchema);
module.exports = User;
