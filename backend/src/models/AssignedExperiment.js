/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for assigned experiments
 * BACKEND CONTRACT: Links experiments to classes with due date and instructions
 * TODO: Add indexes for classId and teacherId queries
 */

const { Schema, model } = require('mongoose');

const AssignedExperimentSchema = new Schema(
  {
    experimentId: { type: Schema.Types.ObjectId, ref: 'Experiment', index: true },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    classId: { type: String, index: true },
    dueDate: { type: Date, required: true },
    instructions: { type: String },
  },
  { timestamps: true }
);

module.exports = model('AssignedExperiment', AssignedExperimentSchema);


