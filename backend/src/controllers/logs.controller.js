/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Experiment logs endpoints including Arcware webhook
 * BACKEND CONTRACT: GET /api/experiments/logs, POST /api/experiments/log and /logs
 * TODO: Persist logs into dedicated collection if needed
 */

const crypto = require('crypto');
const { query, body } = require('express-validator');
const { handleValidation } = require('../utils/validator');

// For simplicity store in memory if USE_MOCKS, else pretend Mongo collection
const inMemoryLogs = [];

const validateGetLogs = [
  query('classId').optional().isString(),
  handleValidation,
];

async function getLogs(req, res) {
  const { classId } = req.query;
  const list = classId ? inMemoryLogs.filter((l) => l.classId === classId) : inMemoryLogs;
  res.json(list);
}

const validatePostLogs = [
  body('experimentId').isString().notEmpty(),
  body('studentId').isString().notEmpty(),
  body('data').isObject(),
  handleValidation,
];

async function postLogs(req, res) {
  const payload = { ...req.body, id: `LOG_${Date.now()}`, createdAt: new Date().toISOString() };
  inMemoryLogs.unshift(payload);
  res.json({ ok: true });
}

const validateArcware = [
  body('experimentId').isString().notEmpty(),
  body('studentId').isString().notEmpty(),
  body('data').exists(),
  handleValidation,
];

async function arcwareWebhook(req, res) {
  const signature = req.headers['x-arcware-signature'];
  const secret = process.env.ARCWARE_HMAC_SECRET || '';
  const bodyStr = JSON.stringify(req.body);
  const expected = crypto.createHmac('sha256', secret).update(bodyStr).digest('hex');
  if (!secret || signature !== expected) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid signature', code: 401 });
  }
  const payload = { ...req.body, id: `LOG_${Date.now()}`, createdAt: new Date().toISOString() };
  inMemoryLogs.unshift(payload);
  res.json({ ok: true });
}

module.exports = { getLogs, validateGetLogs, postLogs, validatePostLogs, arcwareWebhook, validateArcware };


