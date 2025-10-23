/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Quizzes routes
 * BACKEND CONTRACT: GET list/detail, POST create/attempt, GET analysis, GET attempts
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { list, validateList, getById, validateGet, create, validateCreate, update, validateUpdate, remove, validateDelete, attempt, validateAttempt, analysis, validateAnalysis, analytics, validateAnalytics, listAttempts, listMyAttempts, validateMyAttempts, generate, validateGenerate, report, validateReport } = require('../controllers/quizzes.controller');

router.get('/', validateList, list);
router.get('/:quizId', validateGet, getById);
router.post('/', verifyToken, attachUser, requireRole('teacher', 'admin'), validateCreate, create);
router.put('/:quizId', verifyToken, attachUser, requireRole('teacher', 'admin'), validateUpdate, update);
router.delete('/:quizId', verifyToken, attachUser, requireRole('teacher', 'admin'), validateDelete, remove);
router.post('/:quizId/attempt', verifyToken, attachUser, validateAttempt, attempt);
// Alias for submit to align with frontend spec
router.post('/:quizId/submit', verifyToken, attachUser, validateAttempt, attempt);
router.get('/:quizId/analysis', verifyToken, attachUser, validateAnalysis, analysis);
router.get('/:quizId/analytics', verifyToken, attachUser, requireRole('teacher', 'admin'), validateAnalytics, analytics);
router.get('/:quizId/attempts', verifyToken, attachUser, requireRole('teacher', 'admin'), listAttempts);
router.get('/:quizId/my-attempts', verifyToken, attachUser, validateMyAttempts, listMyAttempts);
router.post('/generate', verifyToken, attachUser, requireRole('teacher', 'admin'), validateGenerate, generate);
router.get('/:quizId/report', verifyToken, attachUser, requireRole('teacher', 'admin'), validateReport, report);

module.exports = router;


