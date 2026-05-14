const { Schema, model } = require("mongoose");

const settingsSchema = new Schema(
  {
    workingHours: {
      start: {
        type: String,
        required: [true, "Working start time is required."],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM"],
        default: "08:00",
      },
      end: {
        type: String,
        required: [true, "Working end time is required."],
        match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format. Use HH:MM"],
        default: "17:00",
      },
    },
    workingDays: {
      type: [String],
      enum: {
        values: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        message: "Invalid day of week.",
      },
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "At least one working day must be selected.",
      },
    },
    procedures: {
      type: [
        {
          name: { 
            type: String, 
            required: [true, "Procedure name is required."],
            trim: true,
            maxLength: [100, "Procedure name must be less than 100 characters."],
          },
          price: { 
            type: Number, 
            required: [true, "Procedure price is required."],
            min: [0, "Price cannot be negative."],
          },
          duration: {
            type: Number,
            required: [true, "Procedure duration is required."],
            min: [15, "Duration must be at least 15 minutes."],
            max: [480, "Duration cannot exceed 8 hours."],
          },
          description: {
            type: String,
            trim: true,
            maxLength: [500, "Description must be less than 500 characters."],
          },
        },
      ],
      required: [true, "At least one procedure is required."],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "At least one procedure must be defined.",
      },
    },
    breakDuration: {
      type: Number,
      default: 15,
      min: [0, "Break duration cannot be negative."],
      max: [60, "Break duration cannot exceed 60 minutes."],
    },
    advanceBookingDays: {
      type: Number,
      default: 30,
      min: [1, "Advance booking must be at least 1 day."],
      max: [365, "Advance booking cannot exceed 365 days."],
    },
  },
  {
    timestamps: true,
    strict: true,
  }
);

// virtual to check if master is currently working
settingsSchema.virtual("isCurrentlyWorking").get(function () {
  const now = new Date();
  const currentDay = now.toLocaleDateString("en-US", { weekday: "long" });
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

  return (
    this.isActive &&
    this.workingDays.includes(currentDay) &&
    currentTime >= this.workingHours.start &&
    currentTime <= this.workingHours.end
  );
});

// method to get procedure by name
settingsSchema.methods.getProcedureByName = function (procedureName) {
  return this.procedures.find(proc => proc.name === procedureName);
};

// method to validate if time slot is within working hours
settingsSchema.methods.isTimeSlotValid = function (startTime, endTime) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  
  const dayOfWeek = startDate.toLocaleDateString("en-US", { weekday: "long" });
  const startTimeStr = startDate.toTimeString().slice(0, 5);
  const endTimeStr = endDate.toTimeString().slice(0, 5);

  return (
    this.isActive &&
    this.workingDays.includes(dayOfWeek) &&
    startTimeStr >= this.workingHours.start &&
    endTimeStr <= this.workingHours.end
  );
};

const Settings = model("settings", settingsSchema);
module.exports = Settings;
