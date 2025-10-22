/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Database connection (MongoDB via Mongoose)
 * BACKEND CONTRACT: N/A
 * TODO: Ensure MONGODB_URI is set in production
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');

mongoose.set('strictQuery', true);

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  await mongoose.connect(uri, { autoIndex: true });
  logger.info('Connected to MongoDB');
}

module.exports = { connectDb };


