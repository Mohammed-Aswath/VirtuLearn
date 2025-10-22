/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Logs routes alias under /api/experiments
 * BACKEND CONTRACT: Re-exports logs endpoints as router
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { getLogs, validateGetLogs, postLogs, validatePostLogs, arcwareWebhook, validateArcware } = require('../controllers/logs.controller');

router.get('/logs', verifyToken, attachUser, requireRole('teacher', 'admin'), validateGetLogs, getLogs);
router.post('/logs', verifyToken, attachUser, validatePostLogs, postLogs);
router.post('/log', validateArcware, arcwareWebhook);

module.exports = router;


