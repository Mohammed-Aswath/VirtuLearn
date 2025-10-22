/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for Experiment
 * BACKEND CONTRACT: Stores experiment metadata and assignment info
 * TODO: Add text index on title/description if needed
 */

const { Schema, model } = require('mongoose');

const ExperimentSchema = new Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, enum: ['Physics', 'Chemistry', 'Biology'], required: true, index: true },
    description: String,
    arcwareUrl: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    assignedClasses: [{ type: String }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = model('Experiment', ExperimentSchema);


