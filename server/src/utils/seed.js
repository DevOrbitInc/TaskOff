import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from '../config/env.js';
import User from '../models/User.js';
import Task from '../models/Task.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await User.deleteMany({});
    await Task.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Password123!', salt);

    const testUser = await User.create({
      name: 'Test User',
      email: 'test@taskoff.dev',
      password: hashedPassword,
    });

    const initialTasks = [
      {
        title: 'Setup development environment',
        description: 'Install node modules and configure local .env',
        status: 'Done',
        user: testUser._id,
      },
      {
        title: 'Verify Auth endpoints',
        description: 'Test register and login using Postman',
        status: 'In progress',
        user: testUser._id,
      },
      {
        title: 'Build Task Board Layout',
        description: 'Create frontend columns for status mapping',
        status: 'To do',
        user: testUser._id,
      },
    ];

    await Task.insertMany(initialTasks);
    console.log('Database seeded successfully.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();