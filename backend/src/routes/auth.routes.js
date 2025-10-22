/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Auth routes
 * BACKEND CONTRACT: /api/auth/register, /api/auth/login, /api/auth/me
 */

const router = require('express').Router();
const { register, validateRegister, login, validateLogin, me } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', verifyToken, me);

module.exports = router;


