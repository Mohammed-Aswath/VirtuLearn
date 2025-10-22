/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: AI routes for Gemini proxy
 * BACKEND CONTRACT: POST /chat, POST /generate-quiz, GET /usage
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { chat, validateChat, generateQuiz, validateGenerateQuiz, usage } = require('../controllers/ai.controller');

router.use(verifyToken, attachUser);

router.post('/chat', validateChat, chat);
router.post('/generate-quiz', requireRole('teacher', 'admin'), validateGenerateQuiz, generateQuiz);
router.get('/usage', requireRole('admin'), usage);

module.exports = router;


