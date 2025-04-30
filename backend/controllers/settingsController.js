const catchPromise = require("../utils/catchPromise");

const Settings = require("../models/settingsModel");

exports.getSettings = catchPromise(async (req, res, next) => {
  const settings = await Settings.findOne({});

  res.status(200).json({
    status: "success",
    settings,
  });
});

exports.updateSettings = catchPromise(async (req, res, next) => {
  const updated = await Settings.findOneAndUpdate(
    {}, // first doc
    { $set: req.body },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    status: "success",
    updated,
  });
});
