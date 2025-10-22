/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Gemini API configuration
 * BACKEND CONTRACT: Provides constants for Gemini service; avoids exposing keys
 * TODO: Keep secrets in environment only; never commit real keys
 */

const config = {
  apiKey: process.env.GEMINI_API_KEY || 'AIzaSyANe2LvfylpnMNq1K6COkyrgcFb-yCfa6A',
  rateLimitPerMin: Number(process.env.GEMINI_RATE_LIMIT_PER_MIN || 60),
  // Default to stable Gemini 1.5 Flash if not provided
  model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
  timeoutMs: Number(process.env.GEMINI_TIMEOUT_MS || 60000),
  endpointBase: process.env.GEMINI_ENDPOINT_BASE || 'https://generativelanguage.googleapis.com/v1beta/models',
};

module.exports = config;


