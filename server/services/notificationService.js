const Appointment = require("../models/appointmentModel");

class NotificationService {
  constructor() {
    // Initialize notification providers (SMS, Push, Email)
    this.providers = {
      sms: null, // Will be implemented later with SMS provider
      push: null, // Will be implemented later with Push provider
      email: null, // Will be implemented later with Email provider
    };
  }

  // Send appointment confirmation notification
  async sendAppointmentConfirmation(appointmentId) {
    try {
      const appointment = await Appointment.findById(appointmentId)
        .populate("userId", "name email")
        .populate("masterId", "name email");

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      const client = appointment.userId;
      const master = appointment.masterId;

      // Prepare notification data
      const notificationData = {
        type: "appointment_confirmation",
        appointment,
        client,
        master,
        message: this.generateConfirmationMessage(appointment),
      };

      // Send notifications (placeholder for now)
      await this.sendToClient(client, notificationData);
      await this.sendToMaster(master, notificationData);

      console.log(`✅ Confirmation notifications sent for appointment ${appointmentId}`);
    } catch (error) {
      console.error("Failed to send appointment confirmation:", error);
    }
  }

  // Send appointment reminder notification
  async sendAppointmentReminder(appointmentId) {
    try {
      const appointment = await Appointment.findById(appointmentId)
        .populate("userId", "name email")
        .populate("masterId", "name email");

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      const client = appointment.userId;
      const notificationData = {
        type: "appointment_reminder",
        appointment,
        client,
        message: this.generateReminderMessage(appointment),
      };

      await this.sendToClient(client, notificationData);

      console.log(`⏰ Reminder notification sent for appointment ${appointmentId}`);
    } catch (error) {
      console.error("Failed to send appointment reminder:", error);
    }
  }

  // Send appointment cancellation notification
  async sendAppointmentCancellation(appointmentId) {
    try {
      const appointment = await Appointment.findById(appointmentId)
        .populate("userId", "name email")
        .populate("masterId", "name email");

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      const client = appointment.userId;
      const master = appointment.masterId;

      const notificationData = {
        type: "appointment_cancellation",
        appointment,
        client,
        master,
        message: this.generateCancellationMessage(appointment),
      };

      await this.sendToClient(client, notificationData);
      await this.sendToMaster(master, notificationData);

      console.log(`❌ Cancellation notifications sent for appointment ${appointmentId}`);
    } catch (error) {
      console.error("Failed to send appointment cancellation:", error);
    }
  }

  // Send notification to client
  async sendToClient(client, notificationData) {
    // Placeholder for client notifications
    // In the future, this will send SMS, Push, or Email based on client preferences
    console.log(`📱 Notification to client ${client.name}:`, notificationData.message);
    
    // TODO: Implement actual notification sending
    // - SMS via Twilio/SMS provider
    // - Push notifications via Firebase/OneSignal
    // - Email via SendGrid/Nodemailer
  }

  // Send notification to master
  async sendToMaster(master, notificationData) {
    // Placeholder for master notifications
    console.log(`👨‍💼 Notification to master ${master.name}:`, notificationData.message);
    
    // TODO: Implement actual notification sending
  }

  // Generate confirmation message
  generateConfirmationMessage(appointment) {
    const date = new Date(appointment.startTime).toLocaleDateString("ru-RU");
    const time = new Date(appointment.startTime).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `Ваша запись на ${appointment.procedureName} подтверждена на ${date} в ${time}. Стоимость: ${appointment.procedurePrice}₽`;
  }

  // Generate reminder message
  generateReminderMessage(appointment) {
    const date = new Date(appointment.startTime).toLocaleDateString("ru-RU");
    const time = new Date(appointment.startTime).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `Напоминание: завтра у вас запись на ${appointment.procedureName} в ${time}. Не забудьте прийти!`;
  }

  // Generate cancellation message
  generateCancellationMessage(appointment) {
    const date = new Date(appointment.startTime).toLocaleDateString("ru-RU");
    const time = new Date(appointment.startTime).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `Ваша запись на ${appointment.procedureName} на ${date} в ${time} была отменена.`;
  }

  // Schedule reminder notifications (to be called by cron job)
  async scheduleReminders() {
    try {
      // Find appointments that are tomorrow and confirmed
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const dayAfterTomorrow = new Date(tomorrow);
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

      const appointmentsToRemind = await Appointment.find({
        startTime: {
          $gte: tomorrow,
          $lt: dayAfterTomorrow,
        },
        status: "confirmed",
      });

      for (const appointment of appointmentsToRemind) {
        await this.sendAppointmentReminder(appointment._id);
      }

      console.log(`📅 Processed ${appointmentsToRemind.length} reminder notifications`);
    } catch (error) {
      console.error("Failed to schedule reminders:", error);
    }
  }
}

// Export singleton instance
const notificationService = new NotificationService();
module.exports = notificationService;