/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: User routes
 * BACKEND CONTRACT: /api/users/:id, /api/users?role=student
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { getById, validateGetById, list, validateList } = require('../controllers/users.controller');

router.use(verifyToken, attachUser);

router.get('/:id', requireRole('teacher', 'admin'), validateGetById, getById);
router.get('/', requireRole('teacher', 'admin'), validateList, list);

module.exports = router;


