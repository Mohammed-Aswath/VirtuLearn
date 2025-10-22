/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Central error and 404 handling
 * BACKEND CONTRACT: Returns {error, message, code}
 * TODO: Map known error codes more precisely
 */

function notFoundHandler(req, res, _next) {
  res.status(404).json({ error: 'NotFound', message: `Route ${req.originalUrl} not found`, code: 404 });
}

function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const payload = {
    error: err.name || 'Error',
    message: err.message || 'Internal Server Error',
    code: status,
  };
  if (err.details) payload.details = err.details;
  res.status(status).json(payload);
}

module.exports = { errorHandler, notFoundHandler };


