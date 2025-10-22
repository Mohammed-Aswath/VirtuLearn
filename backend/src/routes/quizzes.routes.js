/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Quizzes routes
 * BACKEND CONTRACT: GET list/detail, POST create/attempt, GET analysis, GET attempts
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { list, validateList, getById, validateGet, create, validateCreate, attempt, validateAttempt, analysis, validateAnalysis, listAttempts } = require('../controllers/quizzes.controller');

router.get('/', validateList, list);
router.get('/:quizId', validateGet, getById);
router.post('/', verifyToken, attachUser, requireRole('teacher', 'admin'), validateCreate, create);
router.post('/:quizId/attempt', verifyToken, attachUser, validateAttempt, attempt);
// Alias for submit to align with frontend spec
router.post('/:quizId/submit', verifyToken, attachUser, validateAttempt, attempt);
router.get('/:quizId/analysis', verifyToken, attachUser, validateAnalysis, analysis);
router.get('/:quizId/attempts', verifyToken, attachUser, requireRole('teacher', 'admin'), listAttempts);

module.exports = router;


