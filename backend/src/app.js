/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Express app setup with middleware and routes
 * BACKEND CONTRACT: Provides REST endpoints under /api/* as per frontend
 * TODO: Replace mock with real external calls and set proper secrets in .env
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { errorHandler, notFoundHandler } = require('./middlewares/error.middleware');
const rateLimit = require('./middlewares/rateLimit.middleware');
const logger = require('./utils/logger');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const experimentRoutes = require('./routes/experiments.routes');
const quizRoutes = require('./routes/quizzes.routes');
const communityRoutes = require('./routes/community.routes');
const aiRoutes = require('./routes/ai.routes');
const logsRoutes = require('./routes/logs.routes');
const s3Routes = require('./routes/s3.routes');

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({ origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:8080'], credentials: true }));
app.use(helmet());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limit sensitive routes
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use('/api/ai', rateLimit({ windowMs: 60 * 1000, max: Number(process.env.GEMINI_RATE_LIMIT_PER_MIN || 60) }));
// Extend timeout for AI routes (Gemini may take longer)
app.use('/api/ai', (req, res, next) => {
  req.setTimeout(Number(process.env.GEMINI_TIMEOUT_MS || 60000));
  res.setTimeout(Number(process.env.GEMINI_TIMEOUT_MS || 60000));
  next();
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/experiments', experimentRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/experiments', logsRoutes); // logs under experiments
app.use('/api/s3', s3Routes);

// Not found and error handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful error logging for unhandled rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection', { reason });
});

module.exports = app;


