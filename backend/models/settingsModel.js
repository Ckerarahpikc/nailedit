const { Schema, model } = require("mongoose");

const settingsSchema = new Schema(
  {
    workingHours: {
      type: String,
      default: "8am-5pm",
    },
    workingDays: {
      type: [String],
      default: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
    procedureNPrice: {
      type: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
        },
      ],
      required: [true, "Procedures and prices are required."],
    },
  },
  {
    strict: true, // ensures that values passed to our model constructor that were not specified in our schema do not get saved to the db
    _id: false,
  }
);

const Settings = model("settings", settingsSchema);
module.exports = Settings;
