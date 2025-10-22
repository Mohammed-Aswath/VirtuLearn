/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Experiments controller for CRUD and assignment
 * BACKEND CONTRACT: Implements endpoints required by frontend
 * TODO: Add ownership checks for teacher-created experiments
 */

const { body, query, param } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const Experiment = require('../models/Experiment');
const AssignedExperiment = require('../models/AssignedExperiment');

const validateList = [
  query('subject').optional().isString(),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('offset').optional().isInt({ min: 0 }),
  handleValidation,
];

async function list(req, res, next) {
  try {
    const { subject } = req.query;
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const filter = subject ? { subject } : {};
    const docs = await Experiment.find(filter).skip(offset).limit(limit).lean();
    res.json(docs);
  } catch (err) {
    next(err);
  }
}

const validateGet = [param('id').isMongoId(), handleValidation];
async function getById(req, res, next) {
  try {
    const exp = await Experiment.findById(req.params.id).lean();
    if (!exp) return res.status(404).json({ error: 'NotFound', message: 'Experiment not found', code: 404 });
    res.json({ experiment: exp });
  } catch (err) {
    next(err);
  }
}

const validateCreate = [
  body('title').isString().notEmpty(),
  body('subject').isString().notEmpty(),
  body('arcwareUrl').isString().notEmpty(),
  body('description').optional().isString(),
  body('difficulty').optional().isIn(['Easy', 'Medium', 'Hard']),
  handleValidation,
];
async function create(req, res, next) {
  try {
    const { title, subject, arcwareUrl, description, difficulty } = req.body;
    const doc = await Experiment.create({ title, subject, arcwareUrl, description, difficulty, createdBy: req.user?._id });
    res.status(201).json({ experiment: doc });
  } catch (err) {
    next(err);
  }
}

const validateAssign = [
  body('experimentId').isMongoId(),
  body('classId').isString().notEmpty(),
  body('dueDate').isISO8601(),
  body('instructions').optional().isString(),
  handleValidation,
];
async function assign(req, res, next) {
  try {
    const { experimentId, classId, dueDate, instructions } = req.body;
    const assigned = await AssignedExperiment.create({ experimentId, teacherId: req.user._id, classId, dueDate, instructions });
    res.json({ success: true, assignedExperiment: assigned });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, validateList, getById, validateGet, create, validateCreate, assign, validateAssign };


