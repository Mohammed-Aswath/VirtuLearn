/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Users controller for fetching profiles and lists
 * BACKEND CONTRACT: GET /api/users/:id, GET /api/users?role=student
 * TODO: Add pagination and search filters
 */

const { query, param } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const User = require('../models/User');

const validateGetById = [param('id').isMongoId(), handleValidation];

async function getById(req, res, next) {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ error: 'NotFound', message: 'User not found', code: 404 });
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, classId: user.classId } });
  } catch (err) {
    next(err);
  }
}

const validateList = [
  query('role').optional().isIn(['student', 'teacher', 'admin']),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 }),
  handleValidation,
];

async function list(req, res, next) {
  try {
    const { role } = req.query;
    const limit = Number(req.query.limit || 20);
    const offset = Number(req.query.offset || 0);
    const filter = role ? { role } : {};
    const users = await User.find(filter).skip(offset).limit(limit).lean();
    res.json(users.map((u) => ({ id: u._id, name: u.name, email: u.email, role: u.role, classId: u.classId })));
  } catch (err) {
    next(err);
  }
}

module.exports = { getById, validateGetById, list, validateList };


