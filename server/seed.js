const mongoose = require("mongoose");
const User = require("./src/models/User"); 
const Task = require("./src/models/Task"); 
const connectDB = require("./src/config/db");
const userData = [
  {
    fullName: "Youssef Alaoui",
    email: "youssef.alaoui@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly1234567890",
  },
  {
    fullName: "Fatima Zahra",
    email: "fatima.zahra@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly0987654321",
  },
  {
    fullName: "Karim Benali",
    email: "karim.benali@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly1122334455",
  },
  {
    fullName: "Amine El Fassi",
    email: "amine.elfassi@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly5544332211",
  },
  {
    fullName: "Sara Idrissi",
    email: "sara.idrissi@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly9988776655",
  },
  {
    fullName: "Mehdi Mansouri",
    email: "mehdi.mansouri@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly5566778899",
  },
  {
    fullName: "Salma Chraibi",
    email: "salma.chraibi@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly1029384756",
  },
  {
    fullName: "Hassan Tazi",
    email: "hassan.tazi@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly5647382910",
  },
  {
    fullName: "Meryem Berrada",
    email: "meryem.berrada@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly1357924680",
  },
  {
    fullName: "Omar Amrani",
    email: "omar.amrani@system.local",
    passwordHash: "$2b$10$dummyHashStringForSeedingOnly0864297531",
  }
]


const seedData = async () => {
  try {
    await connectDB();
    await Task.deleteMany({});
    await User.deleteMany({});

    console.log("Inserting base users...");
    const createdUsers = await User.insertMany(userData);
const taskData = [
  {
    title: "Initialize Backend Repository",
    description: "Set up Node.js, Express, and Mongoose structure.",
    status: "Done",
    tag: "backend",
    assignee: createdUsers[0]._id,
  },
  {
    title: "Implement Authentication Middleware",
    description: "Create JWT validation guards for protected routes.",
    status: "In progress",
    tag: "auth",
    assignee: createdUsers[0]._id,
  },
  {
    title: "Design Responsive Dashboard",
    description: "Implement CSS Grid layout for the main task view.",
    status: "To do",
    tag: "frontend",
    assignee: createdUsers[1]._id,
  },
  {
    title: "Write API Documentation",
    description: "Document all endpoints using Swagger.",
    status: "To do",
    tag: "docs",
    assignee: null,
  },
  {
    title: "Configure Database Schemas",
    description: "Create User and Task models with appropriate validation.",
    status: "Done",
    tag: "backend",
    assignee: createdUsers[2]._id,
  },
  {
    title: "Develop Mobile App UI",
    description: "Build the initial React Native screens for iOS and Android.",
    status: "In progress",
    tag: "mobile",
    assignee: createdUsers[3]._id,
  },
  {
    title: "Integrate OAuth Providers",
    description: "Add Google and GitHub login strategies.",
    status: "In review",
    tag: "auth",
    assignee: createdUsers[4]._id,
  },
  {
    title: "Optimize Frontend Assets",
    description: "Compress images and minify CSS/JS bundles.",
    status: "To do",
    tag: "frontend",
    assignee: createdUsers[5]._id,
  },
  {
    title: "Set Up Push Notifications",
    description: "Implement Firebase Cloud Messaging for mobile alerts.",
    status: "To do",
    tag: "mobile",
    assignee: createdUsers[6]._id,
  },
  {
    title: "Write Deployment Guide",
    description: "Detail the steps to deploy the application to Heroku/Vercel.",
    status: "In review",
    tag: "docs",
    assignee: createdUsers[9]._id,
  }
]
    console.log("Inserting base tasks...");
    await Task.insertMany(taskData);

    console.log("Database seeded successfully. Exiting process.");
    process.exit(0);
  } catch (error) {
    console.error("Seed execution failed:", error);
    process.exit(1);
  }
};

seedData();