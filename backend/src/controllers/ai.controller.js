/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: AI controller for Gemini proxy endpoints
 * BACKEND CONTRACT: chat, generate-quiz, usage
 * TODO: Persist usage metrics
 */

const { body } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const gemini = require('../services/gemini.service');

const validateChat = [
  body('message').isString().notEmpty(),
  body('context').optional(),
  handleValidation,
];
async function chat(req, res, next) {
  try {
    const data = await gemini.chat(req.user?._id?.toString(), req.body.context || {}, req.body.message);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

const validateGenerateQuiz = [
  body('fileUrl').optional().isString(),
  body('prompt').optional().isString(),
  handleValidation,
];
async function generateQuiz(req, res, next) {
  try {
    const data = await gemini.generateQuizFromFile({ fileUrl: req.body.fileUrl, prompt: req.body.prompt });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function usage(_req, res) {
  res.json({ usageData: { perMinLimit: Number(process.env.GEMINI_RATE_LIMIT_PER_MIN || 60) } });
}

module.exports = { chat, validateChat, generateQuiz, validateGenerateQuiz, usage };


