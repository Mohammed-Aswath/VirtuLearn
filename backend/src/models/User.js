/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for User
 * BACKEND CONTRACT: Stores auth, profile, and quiz history
 * TODO: Consider indexes for classId + role queries
 */

const { Schema, model } = require('mongoose');

const QuizHistorySchema = new Schema(
  {
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    score: Number,
    date: Date,
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student', index: true },
    classId: { type: String, index: true },
    avatarUrl: String,
    quizHistory: [QuizHistorySchema],
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = model('User', UserSchema);


