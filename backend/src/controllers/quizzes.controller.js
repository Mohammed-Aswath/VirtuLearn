/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Quizzes controller for list/detail/create/attempt/analysis
 * BACKEND CONTRACT: Matches frontend mock API expectations
 * TODO: Security: ensure students can only submit for allowed quizzes
 */

const { body, query, param } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const AIAnalysis = require('../models/AIAnalysis');
const { generateQuizFromFile } = require('../services/gemini.service');

const validateList = [
  query('subject').optional().isString(),
  handleValidation,
];
async function list(req, res, next) {
  try {
    const filter = req.query.subject ? { subject: req.query.subject } : {};
    const qs = await Quiz.find(filter).lean();
    // Map to simplified shape for frontend compatibility
    const mapped = qs.map((q) => ({
      id: q._id,
      title: q.title,
      subject: q.subject,
      totalQuestions: q.questions.length,
      duration: 30,
      status: 'pending',
      marksObtained: null,
      totalMarks: 100,
    }));
    res.json(mapped);
  } catch (err) {
    next(err);
  }
}

const validateGet = [param('quizId').isMongoId(), handleValidation];
async function getById(req, res, next) {
  try {
    const quiz = await Quiz.findById(req.params.quizId).lean();
    if (!quiz) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    res.json({ quiz });
  } catch (err) {
    next(err);
  }
}

const validateCreate = [
  body('title').isString().notEmpty(),
  body('subject').isString().notEmpty(),
  body('questions').isArray({ min: 1 }),
  handleValidation,
];
async function create(req, res, next) {
  try {
    const { title, subject, questions } = req.body;
    const quiz = await Quiz.create({ title, subject, questions, createdBy: req.user?._id });
    res.status(201).json({ quiz });
  } catch (err) {
    next(err);
  }
}

const validateAttempt = [
  param('quizId').isMongoId(),
  body('answers').isArray(),
  handleValidation,
];
async function attempt(req, res, next) {
  try {
    const quiz = await Quiz.findById(req.params.quizId).lean();
    if (!quiz) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    const answers = req.body.answers || [];
    // Simple scoring: compare to correctIndex
    const mapByQuestionId = new Map(quiz.questions.map((q) => [q._id.toString(), q.correctIndex]));
    let correct = 0;
    for (const a of answers) {
      if (mapByQuestionId.get(String(a.questionId)) === a.chosenIndex) correct++;
    }
    const score = Math.round((correct / Math.max(1, quiz.questions.length)) * 100);
    const doc = await QuizAttempt.create({ quizId: quiz._id, studentId: req.user?._id, answers, score, status: 'attended' });
    res.json({ attemptId: doc._id, score });
  } catch (err) {
    next(err);
  }
}

const validateAnalysis = [param('quizId').isMongoId(), handleValidation];
async function analysis(req, res, next) {
  try {
    const lastAttempt = await QuizAttempt.findOne({ quizId: req.params.quizId, studentId: req.user?._id }).sort({ attemptDate: -1 }).lean();
    if (!lastAttempt) return res.json({ aiAnalyses: { strengths: [], weaknesses: [], suggestions: [], topicWiseScore: [] } });
    let ai = await AIAnalysis.findOne({ attemptId: lastAttempt._id }).lean();
    if (!ai) {
      // Mock generate if missing
      ai = await AIAnalysis.create({ attemptId: lastAttempt._id, strengths: ['Strong fundamentals'], weaknesses: ['Time management'], recommendations: ['Practice timed quizzes'], generatedAt: new Date() });
    }
    const topicWiseScore = [
      { topic: 'Topic A', score: Math.max(50, lastAttempt.score - 10) },
      { topic: 'Topic B', score: lastAttempt.score },
      { topic: 'Topic C', score: Math.min(100, lastAttempt.score + 5) },
    ];
    res.json({ aiAnalyses: { strengths: ai.strengths, weaknesses: ai.weaknesses, suggestions: ai.recommendations, topicWiseScore } });
  } catch (err) {
    next(err);
  }
}

async function listAttempts(req, res, next) {
  try {
    const attempts = await QuizAttempt.find({ quizId: req.query.quizId }).lean();
    res.json(attempts);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, validateList, getById, validateGet, create, validateCreate, attempt, validateAttempt, analysis, validateAnalysis, listAttempts };


