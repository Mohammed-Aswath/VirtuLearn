/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: JWT auth verification and attach user
 * BACKEND CONTRACT: Protects endpoints; sets req.user
 * TODO: Integrate token blacklist/refresh flow as needed
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Missing token', code: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.auth = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid token', code: 401 });
  }
}

async function attachUser(req, _res, next) {
  if (!req.auth || !req.auth.id) return next();
  const user = await User.findById(req.auth.id).lean();
  if (user) req.user = user;
  next();
}

module.exports = { verifyToken, attachUser };


