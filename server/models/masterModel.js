const { Schema, model } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const masterSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Master must have a name."],
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
      required: [true, "Master must include a password."],
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
    permissions: {
      canManageClients: { type: Boolean, default: true },
      canManageMasters: { type: Boolean, default: false },
      canManageSettings: { type: Boolean, default: true },
      canViewAnalytics: { type: Boolean, default: false },
      canManageAllAppointments: { type: Boolean, default: true },
      canManageOwnAppointments: { type: Boolean, default: true },
    },
    specializations: [String],
    experience: {
      type: Number,
      min: 0,
    },
    bio: {
      type: String,
      maxLength: 500,
    },
    phone: {
      type: String,
      trim: true,
    },
    businessSettings: {
      workingHours: {
        monday: { start: String, end: String, isWorking: Boolean },
        tuesday: { start: String, end: String, isWorking: Boolean },
        wednesday: { start: String, end: String, isWorking: Boolean },
        thursday: { start: String, end: String, isWorking: Boolean },
        friday: { start: String, end: String, isWorking: Boolean },
        saturday: { start: String, end: String, isWorking: Boolean },
        sunday: { start: String, end: String, isWorking: Boolean },
      },
      services: [
        {
          name: String,
          duration: Number, // in minutes
          price: Number,
          description: String,
          isActive: { type: Boolean, default: true },
        },
      ],
      breakDuration: { type: Number, default: 15 }, // minutes between appointments
      advanceBookingDays: { type: Number, default: 30 }, // how many days in advance clients can book
      cancellationPolicyHours: { type: Number, default: 24 }, // hours before appointment for free cancellation
    },
    stats: {
      totalAppointments: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
    passwordChangedAt: Date,
    userType: {
      type: String,
      default: "master",
      immutable: true,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "userType",
  }
);

// Pre-save middleware for password hashing
masterSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      parseInt(process.env.SALT_ROUNDS, 10)
    );
    this.confirmPassword = undefined;
  }

  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 5000;
  }
  
  next();
});

// Instance methods
masterSchema.methods.checkPasswords = async (password, cryptedPassword) => {
  const isTheSame = await bcrypt.compare(password, cryptedPassword);
  return isTheSame;
};

masterSchema.methods.checkPasswordChangedAfterTokenExpired = function (
  jwtTimestamp
) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    if (changedAt > jwtTimestamp) {
      return true;
    }
  }
  return false;
};

// Master-specific methods
masterSchema.methods.addService = function (service) {
  this.businessSettings.services.push(service);
  return this.save();
};

masterSchema.methods.updateStats = function (appointmentValue) {
  this.stats.totalAppointments += 1;
  if (appointmentValue) {
    this.stats.totalRevenue += appointmentValue;
  }
  return this.save();
};

masterSchema.methods.isWorkingOn = function (dayOfWeek) {
  const day = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ][dayOfWeek];
  return this.businessSettings.workingHours[day]?.isWorking || false;
};

const Master = model("master", masterSchema);

module.exports = Master;
