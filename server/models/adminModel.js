const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Admin must have a name."],
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
      required: [true, "Admin must include a password."],
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
    photo: {
      type: String,
      default: "default.png",
    },
    // Admin-specific fields
    permissions: {
      canManageClients: { type: Boolean, default: true },
      canManageMasters: { type: Boolean, default: true },
      canManageSettings: { type: Boolean, default: true },
      canViewAnalytics: { type: Boolean, default: true },
      canManageAllAppointments: { type: Boolean, default: true },
      canManageOwnAppointments: { type: Boolean, default: true },
    },
    lastLogin: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: Date,
    userType: {
      type: String,
      default: "admin",
      immutable: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  },
);

// Pre-save middleware for password hashing
adminSchema.pre("save", async function (next) {
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

// Instance methods
adminSchema.methods.checkPasswords = async (password, cryptedPassword) => {
  const isTheSame = await bcrypt.compare(password, cryptedPassword);
  return isTheSame;
};

adminSchema.methods.checkPasswordChangedAfterTokenExpired = function (
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

// Admin-specific methods
adminSchema.methods.hasPermission = function (permission) {
  return this.permissions[permission] === true;
};

adminSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  // Avoid running full validation when only updating lastLogin
  return this.save({ validateBeforeSave: false });
};

const Admin = model("admin", adminSchema);

module.exports = Admin;
