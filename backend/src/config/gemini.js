/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Gemini API configuration
 * BACKEND CONTRACT: Provides constants for Gemini service; avoids exposing keys
 * TODO: Keep secrets in environment only; never commit real keys
 */

const config = {
  apiKey: process.env.GEMINI_API_KEY,
  rateLimitPerMin: Number(process.env.GEMINI_RATE_LIMIT_PER_MIN || 60),
  model: process.env.GEMINI_MODEL || 'flash-2.5',
  timeoutMs: Number(process.env.GEMINI_TIMEOUT_MS || 60000),
  endpointBase: 'https://generativelanguage.googleapis.com/v1beta/models',
};

module.exports = config;


