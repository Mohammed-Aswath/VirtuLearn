/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Experiments routes
 * BACKEND CONTRACT: GET list/detail, POST create/assign, POST /log (arcware)
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { list, validateList, getById, validateGet, create, validateCreate, assign, validateAssign } = require('../controllers/experiments.controller');
const { getLogs, validateGetLogs, postLogs, validatePostLogs, arcwareWebhook, validateArcware } = require('../controllers/logs.controller');

router.get('/', validateList, list);
router.get('/:id', validateGet, getById);

router.post('/', verifyToken, attachUser, requireRole('teacher', 'admin'), validateCreate, create);
router.post('/assign', verifyToken, attachUser, requireRole('teacher', 'admin'), validateAssign, assign);

router.get('/logs', verifyToken, attachUser, requireRole('teacher', 'admin'), validateGetLogs, getLogs);
router.post('/logs', verifyToken, attachUser, validatePostLogs, postLogs);
router.post('/log', validateArcware, arcwareWebhook); // public arcware webhook with HMAC header

module.exports = router;


