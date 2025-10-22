/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Centralized logger using winston
 * BACKEND CONTRACT: N/A
 * TODO: Extend to file transports as needed
 */

const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [new transports.Console({ format: format.simple() })],
});

module.exports = logger;


