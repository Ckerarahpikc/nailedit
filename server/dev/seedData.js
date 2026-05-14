const mongoose = require("mongoose");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Master = require("../models/masterModel");
const Settings = require("../models/settingsModel");
const Appointment = require("../models/appointmentModel");

async function seedDatabase() {
  try {
    console.log("✅ Starting database seeding...");

    // clear data
    await User.deleteMany({});
    await Admin.deleteMany({});
    await Master.deleteMany({});
    await Settings.deleteMany({});
    await Appointment.deleteMany({});

    // master user
    const master = await Master.create({
      name: "Анна Мастер",
      email: "master@nailedit.com",
      password: "password123",
      confirmPassword: "password123",
      photo: "default.png",
      specializations: ["manicure", "pedicure", "nail art"],
      experience: 5,
      bio: "Профессиональный мастер маникюра с 5-летним опытом",
    });

    // clients
    const users = await User.create([
      {
        name: "Мария Клиент",
        email: "maria@example.com",
        password: "password123",
        confirmPassword: "password123",
        photo: "default.png",
        phone: "+7 (900) 123-45-67",
      },
      {
        name: "Елена Петрова",
        email: "elena@example.com",
        password: "password123",
        confirmPassword: "password123",
        photo: "default.png",
        phone: "+7 (900) 234-56-78",
      },
      {
        name: "Ольга Сидорова",
        email: "olga@example.com",
        password: "password123",
        confirmPassword: "password123",
        photo: "default.png",
        phone: "+7 (900) 345-67-89",
      },
    ]);

    // settings for master
    const settings = await Settings.create({
      masterId: master._id,
      workingHours: {
        start: "09:00",
        end: "18:00",
      },
      workingDays: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      procedures: [
        {
          name: "Классический маникюр",
          price: 1500,
          duration: 60,
          description:
            "Обработка кутикулы, придание формы ногтям, покрытие лаком",
        },
        {
          name: "Гель-лак маникюр",
          price: 2000,
          duration: 90,
          description: "Маникюр с покрытием гель-лаком, стойкость до 3 недель",
        },
        {
          name: "Наращивание ногтей",
          price: 3000,
          duration: 120,
          description: "Наращивание ногтей гелем или акрилом",
        },
        {
          name: "Дизайн ногтей",
          price: 500,
          duration: 30,
          description:
            "Художественный дизайн ногтей (дополнительно к маникюру)",
        },
        {
          name: "Педикюр",
          price: 2500,
          duration: 90,
          description: "Обработка стоп, придание формы ногтям, покрытие лаком",
        },
      ],
      breakDuration: 15,
      advanceBookingDays: 30,
      isActive: true,
    });

    // sample for appointments
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);

    const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setDate(now.getDate() + 2);
    dayAfterTomorrow.setHours(14, 0, 0, 0);

    const nextWeek = new Date(now);
    nextWeek.setDate(now.getDate() + 7);
    nextWeek.setHours(11, 0, 0, 0);

    const appointments = await Appointment.create([
      {
        userId: clients[0]._id,
        masterId: master._id,
        procedureName: "Гель-лак маникюр",
        procedurePrice: 2000,
        procedureDuration: 90,
        startTime: tomorrow,
        endTime: new Date(tomorrow.getTime() + 90 * 60 * 1000),
        status: "confirmed",
        notes: "Хочу красный цвет",
      },
      {
        userId: clients[1]._id,
        masterId: master._id,
        procedureName: "Классический маникюр",
        procedurePrice: 1500,
        procedureDuration: 60,
        startTime: dayAfterTomorrow,
        endTime: new Date(dayAfterTomorrow.getTime() + 60 * 60 * 1000),
        status: "pending",
        notes: "Первый раз у вас",
      },
      {
        userId: clients[2]._id,
        masterId: master._id,
        procedureName: "Наращивание ногтей",
        procedurePrice: 3000,
        procedureDuration: 120,
        startTime: nextWeek,
        endTime: new Date(nextWeek.getTime() + 120 * 60 * 1000),
        status: "pending",
        notes: "Хочу длинные ногти для особого случая",
      },
    ]);

    console.log("✅ Created sample appointments");

    // admin user
    const admin = await Admin.create({
      name: "Администратор",
      email: "admin@nailedit.com",
      password: "admin123",
      confirmPassword: "admin123",
      photo: "default.png",
      department: "Management",
    });

    console.log("✅ Created admin user");

    console.log("✅ Database seeding completed successfully!");
    console.log("\n✅ Test accounts created:");
    console.log("\n✅ Master: master@nailedit.com / password123");
    console.log("\n✅ Client 1: maria@example.com / password123");
    console.log("\n✅ Client 2: elena@example.com / password123");
    console.log("\n✅ Client 3: olga@example.com / password123");
    console.log("👑 Admin: admin@nailedit.com / admin123");

    return {
      master,
      users,
      settings,
      appointments,
      admin,
    };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

async function runSeeding() {
  try {
    // connection
    await mongoose.connect(
      process.env.MONGODB_CONNECTION_STRING.replace(
        "<db_password>",
        process.env.MONGODB_PASSWORD,
      ),
    );

    console.log("🔗 Connected to MongoDB");

    await seedDatabase();

    console.log("✅ Seeding completed! Disconnecting...");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

// export functions
module.exports = {
  seedDatabase,
  runSeeding,
};

// run seeding if this file is executed directly
if (require.main === module) {
  require("dotenv").config({ path: __dirname + "/../.env" });
  runSeeding();
}
