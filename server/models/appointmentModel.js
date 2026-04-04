const { Schema, model } = require("mongoose");

const appointmentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Appointment must belong to a user."],
    },
    masterId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Appointment must have a master."],
    },
    procedureName: {
      type: String,
      required: [true, "Procedure name is required."],
      trim: true,
      maxLength: [100, "Procedure name must be less than 100 characters."],
    },
    procedurePrice: {
      type: Number,
      required: [true, "Procedure price is required."],
      min: [0, "Price cannot be negative."],
    },
    procedureDuration: {
      type: Number,
      required: [true, "Procedure duration is required."],
      min: [15, "Duration must be at least 15 minutes."],
      max: [480, "Duration cannot exceed 8 hours."],
    },
    startTime: {
      type: Date,
      required: [true, "Start time is required."],
      validate: {
        validator: function (val) {
          return val > new Date();
        },
        message: "Start time must be in the future.",
      },
    },
    endTime: {
      type: Date,
      required: [true, "End time is required."],
      validate: {
        validator: function (val) {
          return val > this.startTime;
        },
        message: "End time must be after start time.",
      },
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "confirmed", "completed", "cancelled"],
        message: "Status must be: pending, confirmed, completed, or cancelled.",
      },
      default: "pending",
    },
    notes: {
      type: String,
      trim: true,
      maxLength: [500, "Notes must be less than 500 characters."],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// indexing most used schema props
appointmentSchema.index({ userId: 1, startTime: 1 });
appointmentSchema.index({ masterId: 1, startTime: 1 });
appointmentSchema.index({ startTime: 1, endTime: 1 });

// virtual duration minutes
appointmentSchema.virtual("durationMinutes").get(function () {
  return Math.round((this.endTime - this.startTime) / (1000 * 60));
});

// pre-save middleware to calculate endTime if not provided
appointmentSchema.pre("save", function (next) {
  if (!this.endTime && this.procedureDuration) {
    this.endTime = new Date(
      this.startTime.getTime() + this.procedureDuration * 60 * 1000
    );
  }
  next();
});

// Static method to check for time conflicts
appointmentSchema.statics.checkTimeConflict = async function (
  masterId,
  startTime,
  endTime,
  excludeId = null
) {
  const query = {
    masterId,
    status: { $in: ["pending", "confirmed"] },
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime },
      },
    ],
  };

  if (excludeId) {
    query._id = { $ne: excludeId };
  }

  const conflictingAppointment = await this.findOne(query);
  return !!conflictingAppointment;
};

// Instance method to check if appointment can be cancelled
appointmentSchema.methods.canBeCancelled = function () {
  const now = new Date();
  const hoursUntilAppointment = (this.startTime - now) / (1000 * 60 * 60);
  return hoursUntilAppointment >= 24 && this.status === "pending";
};

const Appointment = model("appointment", appointmentSchema);

module.exports = Appointment;