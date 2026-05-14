const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Client must have a name."],
      trim: true,
      maxLength: [50, "Name must be less than or equal to 50 characters."],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      validate: {
        validator: (val) => {
          return validator.isEmail(val);
        },
        message: "You should use a real email.",
      },
    },
    password: {
      type: String,
      required: [true, "Client must include a password."],
      minLength: 6,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: function () {
        return this.isNew || this.isModified("password");
      },
      validate: {
        validator: function (val) {
          if (!this.isModified("password")) return true;
          return val === this.password;
        },
        message: "Passwords should match.",
      },
    },
    permissions: {
      canManageClients: { type: Boolean, default: false },
      canManageMasters: { type: Boolean, default: false },
      canManageSettings: { type: Boolean, default: false },
      canViewAnalytics: { type: Boolean, default: false },
      canManageAllAppointments: { type: Boolean, default: false },
      canManageOwnAppointments: { type: Boolean, default: true },
    },
    photo: {
      type: String,
      default: "default.png",
    },
    phone: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    totalAppointments: {
      type: Number,
      default: 0,
    },
    passwordChangedAt: Date,
    userType: {
      type: String,
      default: "user",
      immutable: true, // only can change if document has isNew: true
    },
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  },
);

// pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUNDS, 10),
    );
    this.confirmPassword = undefined;
  }

  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 5000;
  }

  next();
});

// instance methods
userSchema.methods.checkPasswords = async (password, cryptedPassword) => {
  const isTheSame = await bcrypt.compare(password, cryptedPassword);
  return isTheSame;
};

// password chnage after tokin expiration date
userSchema.methods.checkPasswordChangedAfterTokenExpired = function (
  jwtTimestamp,
) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    if (changedAt > jwtTimestamp) {
      return true;
    }
  }
  return false;
};

const User = model("user", userSchema);

module.exports = User;
