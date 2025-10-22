/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for QuizAttempt
 * BACKEND CONTRACT: Tracks student answers and scores
 * TODO: Add compound index for quizId + studentId
 */

const { Schema, model } = require('mongoose');

const AnswerSchema = new Schema(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    chosenIndex: { type: Number, required: true },
  },
  { _id: false }
);

const QuizAttemptSchema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', index: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    answers: [AnswerSchema],
    score: Number,
    status: { type: String, enum: ['not_attempted', 'attended', 'missed'], default: 'attended' },
    attemptDate: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = model('QuizAttempt', QuizAttemptSchema);


