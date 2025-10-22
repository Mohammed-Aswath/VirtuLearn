/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Simple wrapper for express-rate-limit
 * BACKEND CONTRACT: Apply to routes to prevent abuse
 * TODO: Persist rate limit store if needed
 */

const rateLimit = require('express-rate-limit');

module.exports = (opts) => rateLimit({
  standardHeaders: true,
  legacyHeaders: false,
  ...opts,
});


