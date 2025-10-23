/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for Quiz and embedded Questions
 * BACKEND CONTRACT: Supports student attempts and teacher creation
 * TODO: Add indexes on subject and createdBy
 */

const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema(
  {
    prompt: { type: String, required: true },
    choices: { type: [String], required: true },
    correctIndex: { type: Number, required: true },
    explanation: { type: String }, // optional explanation for learning feedback
  },
  { _id: true }
);

const QuizSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    subject: { type: String, required: true },
    dueDate: { type: Date },
    difficulty: { type: String, enum: ['Easy','Medium','Hard'], default: 'Medium' },
    topic: { type: String },
    tags: { type: [String], default: [] },
    duration: { type: Number, default: 30 }, // minutes
    questions: { type: [QuestionSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = model('Quiz', QuizSchema);


