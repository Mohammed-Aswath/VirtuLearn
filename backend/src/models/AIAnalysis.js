/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for AI Analysis per attempt
 * BACKEND CONTRACT: Stores strengths, weaknesses, recommendations
 * TODO: Consider TTL if analyses should expire
 */

const { Schema, model } = require('mongoose');

const AIAnalysisSchema = new Schema(
  {
    attemptId: { type: Schema.Types.ObjectId, ref: 'QuizAttempt', unique: true },
    strengths: [String],
    weaknesses: [String],
    recommendations: [String],
    generatedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = model('AIAnalysis', AIAnalysisSchema);


