const catchPromise = require("../utils/catchPromise");
const SetUpError = require("../utils/errorConfig");
const Appointment = require("../models/appointmentModel");
const Settings = require("../models/settingsModel");
const Master = require("../models/masterModel");

// get all apt
exports.getAllAppointments = catchPromise(async (req, res, next) => {
  let filter = {};

  // if client - show only personal apt
  if (req.user.status === "user") {
    filter.userId = req.user._id;
  }
  // if master - show all apt created for this master
  else if (req.user.status === "master") {
    filter.masterId = req.user._id;
  }
  // if admin - show all apt
  else if (req.user.status === "admin") {
    // no filter, just skipping
  }

  const appointments = await Appointment.find(filter)
    .populate("userId", "name email photo")
    .populate("masterId", "name email")
    .sort({ startTime: 1 });

  if (!appointments) {
    return next(new SetUpError("No appointments found.", 404));
  }

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: { appointments },
  });
});

// single apt
exports.getAppointment = catchPromise(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate("userId", "name email photo")
    .populate("masterId", "name email");

  if (!appointment) {
    return next(new SetUpError("No appointment found with that ID", 404));
  }

  // check if user has permission to view this appointment
  if (
    req.user.status === "user" &&
    appointment.userId._id.toString() !== req.user._id.toString()
  ) {
    return next(
      new SetUpError("You don't have permission to view this appointment", 403),
    );
  }

  if (
    req.user.status === "master" &&
    appointment.masterId._id.toString() !== req.user._id.toString()
  ) {
    return next(
      new SetUpError("You don't have permission to view this appointment", 403),
    );
  }

  res.status(200).json({
    status: "success",
    data: { appointment },
  });
});

// create new appointment (only clients can create)
exports.createAppointment = catchPromise(async (req, res, next) => {
  const { masterId, procedureName, startTime, notes } = req.body;

  // only clients can create appointments
  if (req.user.status !== "user") {
    return next(new SetUpError("Only clients can create appointments", 403));
  }

  // verify master exists and is active
  const master = await Master.findOne({ _id: masterId, userType: "master" });
  if (!master) {
    return next(new SetUpError("Master not found or inactive", 404));
  }

  // get master's settings
  const settings = await Settings.findOne({ masterId, isActive: true });
  if (!settings) {
    return next(new SetUpError("Master settings not found or inactive", 404));
  }

  // find the procedure
  const procedure = settings.getProcedureByName(procedureName);
  if (!procedure) {
    return next(new SetUpError("Procedure not found", 404));
  }

  // calculate end time
  const appointmentStart = new Date(startTime);
  const appointmentEnd = new Date(
    appointmentStart.getTime() + procedure.duration * 60 * 1000,
  );

  // validate time slot is within working hours
  if (!settings.isTimeSlotValid(appointmentStart, appointmentEnd)) {
    return next(new SetUpError("Selected time is outside working hours", 400));
  }

  // check for conflicts
  const hasConflict = await Appointment.checkTimeConflict(
    masterId,
    appointmentStart,
    appointmentEnd,
  );

  if (hasConflict) {
    return next(new SetUpError("Time slot is already booked", 400));
  }

  // create appointment
  const appointment = await Appointment.create({
    userId: req.user._id,
    masterId,
    procedureName: procedure.name,
    procedurePrice: procedure.price,
    procedureDuration: procedure.duration,
    startTime: appointmentStart,
    endTime: appointmentEnd,
    notes,
  });

  await appointment.populate("userId", "name email photo");
  await appointment.populate("masterId", "name email");

  res.status(201).json({
    status: "success",
    data: { appointment },
  });
});

// update appointment
exports.updateAppointment = catchPromise(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new SetUpError("No appointment found with that ID", 404));
  }

  // check permissions
  const canUpdate =
    req.user.status === "admin" ||
    (req.user.status === "master" &&
      appointment.masterId.toString() === req.user._id.toString()) ||
    (req.user.status === "user" &&
      appointment.userId.toString() === req.user._id.toString() &&
      appointment.status === "pending");

  if (!canUpdate) {
    return next(
      new SetUpError(
        "You don't have permission to update this appointment",
        403,
      ),
    );
  }

  // clients can only update notes and cancel
  if (req.user.status === "user") {
    const allowedFields = ["notes"];
    if (req.body.status === "cancelled" && appointment.canBeCancelled()) {
      allowedFields.push("status");
    }

    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    Object.assign(appointment, updates);
  } else {
    // masters and admins can update status and notes
    const allowedFields = ["status", "notes"];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    Object.assign(appointment, updates);
  }

  await appointment.save();
  await appointment.populate("userId", "name email photo");
  await appointment.populate("masterId", "name email");

  res.status(200).json({
    status: "success",
    data: { appointment },
  });
});

// delete appointment
exports.deleteAppointment = catchPromise(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new SetUpError("No appointment found with that ID", 404));
  }

  // check permissions
  const canDelete =
    req.user.status === "admin" ||
    (req.user.status === "master" &&
      appointment.masterId.toString() === req.user._id.toString()) ||
    (req.user.status === "user" &&
      appointment.userId.toString() === req.user._id.toString() &&
      appointment.canBeCancelled());

  if (!canDelete) {
    return next(
      new SetUpError(
        "You don't have permission to delete this appointment",
        403,
      ),
    );
  }

  await Appointment.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// get available time slots for booking
exports.getAvailableSlots = catchPromise(async (req, res, next) => {
  const { masterId, date, procedureName } = req.query;
  console.log(masterId, date, procedureName);

  if (!masterId || !date || !procedureName) {
    return next(
      new SetUpError("Master ID, date, and procedure name are required", 400),
    );
  }

  // get master's settings
  const settings = await Settings.findOne({ masterId, isActive: true });
  if (!settings) {
    return next(new SetUpError("Master settings not found", 404));
  }

  // find the procedure
  const procedure = settings.getProcedureByName(procedureName);
  if (!procedure) {
    return next(new SetUpError("Procedure not found", 404));
  }

  // get the requested date
  const requestedDate = new Date(date);
  const dayOfWeek = requestedDate.toLocaleDateString("en-US", {
    weekday: "long",
  });

  // check if master works on this day
  if (!settings.workingDays.includes(dayOfWeek)) {
    return res.status(200).json({
      status: "success",
      data: { availableSlots: [] },
    });
  }

  // get existing appointments for this date
  const startOfDay = new Date(requestedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(requestedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const existingAppointments = await Appointment.find({
    masterId,
    startTime: { $gte: startOfDay, $lte: endOfDay },
    status: { $in: ["pending", "confirmed"] },
  }).sort({ startTime: 1 });

  // generate available slots
  const availableSlots = [];
  const workStart = settings.workingHours.start.split(":");
  const workEnd = settings.workingHours.end.split(":");

  let currentTime = new Date(requestedDate);
  currentTime.setHours(parseInt(workStart[0]), parseInt(workStart[1]), 0, 0);

  const endTime = new Date(requestedDate);
  endTime.setHours(parseInt(workEnd[0]), parseInt(workEnd[1]), 0, 0);

  while (currentTime < endTime) {
    const slotEnd = new Date(
      currentTime.getTime() + procedure.duration * 60 * 1000,
    );

    // check if slot fits within working hours
    if (slotEnd <= endTime) {
      // check for conflicts with existing appointments
      const hasConflict = existingAppointments.some((appointment) => {
        return (
          currentTime < appointment.endTime && slotEnd > appointment.startTime
        );
      });

      // check if slot is in the future
      const now = new Date();
      const isInFuture = currentTime > now;

      if (!hasConflict && isInFuture) {
        availableSlots.push({
          startTime: new Date(currentTime),
          endTime: new Date(slotEnd),
        });
      }
    }

    // move to next slot (procedure duration + break)
    currentTime = new Date(
      currentTime.getTime() +
        (procedure.duration + settings.breakDuration) * 60 * 1000,
    );
  }

  res.status(200).json({
    status: "success",
    data: { availableSlots },
  });
});

