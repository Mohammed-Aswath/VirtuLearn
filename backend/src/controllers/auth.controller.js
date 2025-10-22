/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Auth controller for register/login/me
 * BACKEND CONTRACT: JWT-based auth, role-aware user payloads
 * TODO: Add email verification and password reset flows
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const User = require('../models/User');

const SALT_ROUNDS = 10;

function sign(user) {
  const payload = { id: user._id.toString(), role: user.role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRY || '7d' });
  return token;
}

const validateRegister = [
  body('name').isString().isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  body('role').optional().isIn(['student', 'teacher', 'admin']),
  body('classId').optional().isString(),
  handleValidation,
];

async function register(req, res, next) {
  try {
    const { name, email, password, role = 'student', classId } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'Conflict', message: 'Email already registered', code: 409 });
    }
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, passwordHash, role, classId });
    const token = sign(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, classId: user.classId }, token });
  } catch (err) {
    next(err);
  }
}

const validateLogin = [
  body('email').isEmail(),
  body('password').isString().isLength({ min: 6 }),
  handleValidation,
];

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials', code: 401 });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials', code: 401 });
    const token = sign(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, classId: user.classId }, token });
  } catch (err) {
    next(err);
  }
}

async function me(req, res) {
  const user = await User.findById(req.auth.id).lean();
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, classId: user.classId } });
}

module.exports = { register, validateRegister, login, validateLogin, me };


