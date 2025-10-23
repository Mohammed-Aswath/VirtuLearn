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

function ok(res, data, message = 'OK') {
  res.json({ success: true, data, message });
}

const validateList = [
  query('subject').optional().isString(),
  query('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']),
  query('mine').optional().isBoolean().toBoolean(),
  handleValidation,
];
async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.subject) filter.subject = req.query.subject;
    if (req.query.difficulty) filter.difficulty = req.query.difficulty;
    if (req.query.mine && req.user?._id) filter.createdBy = req.user._id;
    const qs = await Quiz.find(filter).lean();
    // Overlay student's last attempt if authenticated
    let attemptsByQuiz = new Map();
    if (req.auth?.id) {
      const attempts = await QuizAttempt.find({ studentId: req.auth.id }).sort({ attemptDate: -1 }).lean();
      for (const a of attempts) {
        const k = String(a.quizId);
        if (!attemptsByQuiz.has(k)) attemptsByQuiz.set(k, a);
      }
    }
    const now = Date.now();
    const mapped = qs.map((q) => {
      const base = {
        id: q._id,
        title: q.title,
        description: q.description,
        subject: q.subject,
        totalQuestions: q.questions.length,
        duration: q.duration || 30,
        difficulty: q.difficulty,
        topic: q.topic,
        tags: q.tags || [],
        totalMarks: 100,
        dueDate: q.dueDate ? new Date(q.dueDate).toISOString().slice(0,10) : undefined,
      };
      const latest = attemptsByQuiz.get(String(q._id));
      if (latest) {
        return {
          ...base,
          status: 'attended',
          marksObtained: latest.score,
          completedDate: new Date(latest.attemptDate).toISOString().slice(0,10),
        };
      }
      if (q.dueDate && new Date(q.dueDate).getTime() < now) {
        return { ...base, status: 'missed', marksObtained: null };
      }
      return { ...base, status: 'pending', marksObtained: null };
    });
    ok(res, mapped, 'Quizzes fetched successfully');
  } catch (err) {
    next(err);
  }
}

const validateGet = [param('quizId').isMongoId(), handleValidation];
async function getById(req, res, next) {
  try {
    const quiz = await Quiz.findById(req.params.quizId).lean();
    if (!quiz) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    ok(res, { quiz: { ...quiz, id: quiz._id } }, 'Quiz fetched successfully');
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
    const { title, subject, dueDate, difficulty, topic, description, tags, duration, questions } = req.body;
    const quiz = await Quiz.create({ title, subject, dueDate, difficulty, topic, description, tags, duration, questions, createdBy: req.user?._id });
    res.status(201);
    ok(res, { quiz }, 'Quiz created');
  } catch (err) {
    next(err);
  }
}

const validateUpdate = [
  param('quizId').isMongoId(),
  body('title').optional().isString().notEmpty(),
  body('subject').optional().isString().notEmpty(),
  body('description').optional().isString(),
  body('dueDate').optional().isISO8601().toDate(),
  body('difficulty').optional().isIn(['Easy','Medium','Hard']),
  body('topic').optional().isString(),
  body('tags').optional().isArray(),
  body('duration').optional().isInt({ min: 1, max: 240 }),
  body('questions').optional().isArray({ min: 1 }),
  handleValidation,
];
async function update(req, res, next) {
  try {
    const updates = { ...req.body };
    const quiz = await Quiz.findOneAndUpdate(
      { _id: req.params.quizId },
      { $set: updates },
      { new: true }
    ).lean();
    if (!quiz) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    ok(res, { quiz }, 'Quiz updated');
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
    ok(res, { attemptId: doc._id, score }, 'Attempt recorded');
  } catch (err) {
    next(err);
  }
}

const validateAnalysis = [param('quizId').isMongoId(), handleValidation];
async function analysis(req, res, next) {
  try {
    const lastAttempt = await QuizAttempt.findOne({ quizId: req.params.quizId, studentId: req.user?._id }).sort({ attemptDate: -1 }).lean();
    if (!lastAttempt) return ok(res, { aiAnalyses: { strengths: [], weaknesses: [], suggestions: [], topicWiseScore: [] } }, 'No attempts yet');
    let ai = await AIAnalysis.findOne({ attemptId: lastAttempt._id }).lean();
    if (!ai) {
      // Lightweight analysis generation (with Gemini suggestion if available)
      const strengths = lastAttempt.score >= 80 ? ['Excellent conceptual understanding'] : lastAttempt.score >= 60 ? ['Good foundational knowledge'] : ['Basic understanding present'];
      const weaknesses = lastAttempt.score < 60 ? ['Needs practice on fundamentals'] : lastAttempt.score < 80 ? ['Improve speed and accuracy'] : ['Minor gaps to address'];
      const { chat } = require('../services/gemini.service');
      let recommendations = ['Review weak topics and practice timed questions'];
      try {
        const resp = await chat(String(req.user?._id || ''), [], `Provide one short recommendation for a student who scored ${lastAttempt.score}/100 on a quiz. Keep it under 140 characters.`);
        const assistant = (resp?.messages || []).find((m) => m.role === 'assistant');
        if (assistant?.message) recommendations = [assistant.message];
      } catch (_e) {}
      const created = await AIAnalysis.create({ attemptId: lastAttempt._id, strengths, weaknesses, recommendations, generatedAt: new Date() });
      ai = created.toObject();
    }
    const topicWiseScore = [
      { topic: 'Topic A', score: Math.max(50, lastAttempt.score - 10) },
      { topic: 'Topic B', score: lastAttempt.score },
      { topic: 'Topic C', score: Math.min(100, lastAttempt.score + 5) },
    ];
    ok(res, { aiAnalyses: { strengths: ai.strengths, weaknesses: ai.weaknesses, suggestions: ai.recommendations, topicWiseScore } }, 'Analysis ready');
  } catch (err) {
    next(err);
  }
}

const validateMyAttempts = [param('quizId').isMongoId(), handleValidation];
async function listMyAttempts(req, res, next) {
  try {
    const attempts = await QuizAttempt.find({ quizId: req.params.quizId, studentId: req.user?._id }).sort({ attemptDate: -1 }).lean();
    ok(res, attempts, 'My attempts');
  } catch (err) {
    next(err);
  }
}

async function listAttempts(req, res, next) {
  try {
    const attempts = await QuizAttempt.find({ quizId: req.query.quizId }).lean();
    ok(res, attempts, 'Attempts list');
  } catch (err) {
    next(err);
  }
}

const validateDelete = [param('quizId').isMongoId(), handleValidation];
async function remove(req, res, next) {
  try {
    const deleted = await Quiz.findByIdAndDelete(req.params.quizId).lean();
    if (!deleted) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    ok(res, { id: deleted._id }, 'Quiz deleted');
  } catch (err) {
    next(err);
  }
}

const validateAnalytics = [param('quizId').isMongoId(), handleValidation];
async function analytics(req, res, next) {
  try {
    const quiz = await Quiz.findById(req.params.quizId).lean();
    if (!quiz) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    const attempts = await QuizAttempt.find({ quizId: quiz._id }).lean();
    const total = attempts.length || 1;
    const averageScore = attempts.reduce((s, a) => s + (a.score || 0), 0) / total;
    const top = attempts.reduce((m, a) => (a.score > (m?.score || -1) ? a : m), null);
    // Question-level accuracy
    const correctMap = new Map(quiz.questions.map((q) => [String(q._id), q.correctIndex]));
    const perQuestion = quiz.questions.map((q) => ({ questionId: String(q._id), prompt: q.prompt, correct: 0, total: 0 }));
    const byId = new Map(perQuestion.map((x) => [x.questionId, x]));
    for (const a of attempts) {
      for (const ans of a.answers || []) {
        const id = String(ans.questionId);
        const rec = byId.get(id);
        if (!rec) continue;
        rec.total += 1;
        if (correctMap.get(id) === ans.chosenIndex) rec.correct += 1;
      }
    }
    const questionAccuracy = perQuestion.map((r) => ({
      questionId: r.questionId,
      prompt: r.prompt,
      accuracyPercent: r.total ? Math.round((r.correct / r.total) * 100) : 0,
    }));
    ok(res, {
      summary: {
        attempts: attempts.length,
        averageScore: Math.round(averageScore),
        topPerformer: top ? { studentId: top.studentId, score: top.score } : null,
      },
      questionAccuracy,
      attempts,
    }, 'Analytics computed');
  } catch (err) {
    next(err);
  }
}

const validateGenerate = [
  body('prompt').optional().isString(),
  body('fileUrl').optional().isString(),
  body('subject').optional().isString(),
  body('difficulty').optional().isIn(['Easy','Medium','Hard']),
  body('numQuestions').optional().isInt({ min: 1, max: 50 }),
  handleValidation,
];
async function generate(req, res, next) {
  try {
    const { prompt, fileUrl, subject, difficulty } = req.body;
    const { quizDraft } = await generateQuizFromFile({ fileUrl, prompt });
    const merged = { ...quizDraft, subject: subject || quizDraft.subject, difficulty: difficulty || 'Medium' };
    ok(res, { quizDraft: merged }, 'Quiz draft generated');
  } catch (err) {
    next(err);
  }
}

const validateReport = [param('quizId').isMongoId(), handleValidation];
async function report(req, res, next) {
  try {
    let PDFDocument;
    try {
      // Lazy require to avoid hard dependency during tests
      // eslint-disable-next-line
      PDFDocument = require('pdfkit');
    } catch (_e) {
      return res.status(501).json({ success: false, message: 'PDF generation not available on this deployment' });
    }
    const quiz = await Quiz.findById(req.params.quizId).lean();
    if (!quiz) return res.status(404).json({ error: 'NotFound', message: 'Quiz not found', code: 404 });
    const attempts = await QuizAttempt.find({ quizId: quiz._id }).lean();
    const filename = `quiz-report-${String(quiz._id)}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    doc.pipe(res);
    doc.fontSize(18).text(`Quiz Report: ${quiz.title}`, { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Subject: ${quiz.subject}`);
    doc.text(`Difficulty: ${quiz.difficulty}`);
    doc.text(`Questions: ${quiz.questions.length}`);
    doc.text(`Generated: ${new Date().toISOString()}`);
    doc.moveDown();
    const avg = attempts.length ? Math.round(attempts.reduce((s,a)=>s+(a.score||0),0)/attempts.length) : 0;
    doc.text(`Attempts: ${attempts.length}`);
    doc.text(`Average Score: ${avg}`);
    doc.moveDown();
    doc.text('Question Accuracy:');
    const correctMap = new Map(quiz.questions.map((q) => [String(q._id), q.correctIndex]));
    const stats = new Map(quiz.questions.map((q) => [String(q._id), { correct:0, total:0, prompt: q.prompt }]));
    for (const a of attempts) {
      for (const ans of a.answers || []) {
        const id = String(ans.questionId);
        const s = stats.get(id);
        if (!s) continue;
        s.total += 1;
        if (correctMap.get(id) === ans.chosenIndex) s.correct += 1;
      }
    }
    for (const [_, s] of stats) {
      const pct = s.total ? Math.round((s.correct / s.total) * 100) : 0;
      doc.text(`- ${s.prompt.slice(0, 80)}...: ${pct}%`);
    }
    doc.end();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, validateList, getById, validateGet, create, validateCreate, update, validateUpdate, remove, validateDelete, attempt, validateAttempt, analysis, validateAnalysis, analytics, validateAnalytics, listAttempts, listMyAttempts, validateMyAttempts, generate, validateGenerate, report, validateReport };


