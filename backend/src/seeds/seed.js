/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Seed database with sample users, experiments, quizzes, posts
 * BACKEND CONTRACT: Run via npm run seed
 * TODO: Expand data to cover more scenarios
 */

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { connectDb } = require('../config/db');
const User = require('../models/User');
const Experiment = require('../models/Experiment');
const Quiz = require('../models/Quiz');
const CommunityPost = require('../models/CommunityPost');

async function main() {
  await connectDb();
  await Promise.all([
    User.deleteMany({}),
    Experiment.deleteMany({}),
    Quiz.deleteMany({}),
    CommunityPost.deleteMany({}),
  ]);

  const passwordHash = await bcrypt.hash('password123', 10);
  const [teacher1, teacher2] = await User.insertMany([
    { name: 'Dr. Sarah Williams', email: 'sarah@example.com', passwordHash, role: 'teacher' },
    { name: 'Prof. Michael Chen', email: 'michael@example.com', passwordHash, role: 'teacher' },
  ]);
  await User.insertMany([
    { name: 'Alex Johnson', email: 'alex@example.com', passwordHash, role: 'student', classId: 'C001' },
    { name: 'Priya Singh', email: 'priya@example.com', passwordHash, role: 'student', classId: 'C001' },
    { name: 'Diego Ramirez', email: 'diego@example.com', passwordHash, role: 'student', classId: 'C002' },
    { name: 'Mina Lee', email: 'mina@example.com', passwordHash, role: 'student', classId: 'C002' },
  ]);

  await Experiment.insertMany([
    { title: "Ohm's Law Verification", subject: 'Physics', description: 'Voltage-current relation', arcwareUrl: 'https://arcware.example.com/ohms-law', difficulty: 'Medium', createdBy: teacher1._id },
    { title: 'Chemical Bonding Simulation', subject: 'Chemistry', description: 'Bond formation', arcwareUrl: 'https://arcware.example.com/bonding', difficulty: 'Hard', createdBy: teacher1._id },
    { title: 'Plant Cell Structure', subject: 'Biology', description: 'Cell organelles', arcwareUrl: 'https://arcware.example.com/plant-cell', difficulty: 'Easy', createdBy: teacher2._id },
  ]);

  await Quiz.insertMany([
    {
      title: "Newton's Laws of Motion",
      subject: 'Physics',
      questions: [
        { prompt: 'Unit of force?', choices: ['Newton', 'Joule', 'Watt', 'Pascal'], correctIndex: 0 },
        { prompt: 'Which law is action-reaction?', choices: ['First', 'Second', 'Third', 'Zeroth'], correctIndex: 2 },
      ],
      createdBy: teacher1._id,
    },
    {
      title: 'Chemical Reactions',
      subject: 'Chemistry',
      questions: [
        { prompt: 'What is oxidation?', choices: ['Gain of O', 'Loss of O', 'Gain of H', 'None'], correctIndex: 0 },
      ],
      createdBy: teacher1._id,
    },
  ]);

  await CommunityPost.insertMany([
    { teacherId: teacher1._id, subject: 'Physics', title: 'Lab Safety Guidelines', body: 'Review safety protocols', media: [], createdAt: new Date() },
    { teacherId: teacher2._id, subject: 'Biology', title: 'Photosynthesis Guide', body: 'Study resources attached', media: [{ type: 'pdf', url: 'https://example.com/guide.pdf' }], createdAt: new Date() },
  ]);

  // eslint-disable-next-line no-console
  console.log('Seed completed');
  await mongoose.disconnect();
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});


