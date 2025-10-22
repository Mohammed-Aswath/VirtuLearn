/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Server bootstrap and environment initialization
 * BACKEND CONTRACT: Serves all /api/* endpoints consumed by the VirtuLearn frontend
 * TODO: Replace mock with real external calls and set proper secrets in .env
 */

const http = require('http');
const dotenv = require('dotenv');
dotenv.config();

const { connectDb } = require('./config/db');
const logger = require('./utils/logger');
const app = require('./app');

const PORT = process.env.PORT || 8081;

async function start() {
  try {
    await connectDb();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      logger.info(`VirtuLearn backend listening on port ${PORT}`);
    });
  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  }
}

start();


