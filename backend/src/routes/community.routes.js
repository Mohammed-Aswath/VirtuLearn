/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Community routes
 * BACKEND CONTRACT: GET list, POST create, DELETE remove
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');
const { list, validateList, create, validateCreate, remove, validateRemove, addComment, validateAddComment } = require('../controllers/community.controller');

// Compatibility: /api/community?subject=...
router.get('/', validateList, list);
// Aliases: /api/community/posts -> list or create
router.get('/posts', validateList, list);
router.post('/posts', verifyToken, attachUser, requireRole('teacher', 'admin'), validateCreate, create);
// Comments: /api/community/comment/:postId
router.post('/comment/:postId', verifyToken, attachUser, validateAddComment, addComment);
// Delete
router.delete('/:id', verifyToken, attachUser, requireRole('teacher', 'admin'), validateRemove, remove);

module.exports = router;


