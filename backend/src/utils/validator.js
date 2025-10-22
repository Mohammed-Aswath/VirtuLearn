/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Request validation helpers using express-validator
 * BACKEND CONTRACT: N/A
 * TODO: Expand schemas as routes evolve
 */

const { validationResult } = require('express-validator');

function handleValidation(req, _res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.details = errors.array();
    return next(err);
  }
  next();
}

module.exports = { handleValidation };


