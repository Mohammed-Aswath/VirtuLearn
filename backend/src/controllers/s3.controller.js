/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: S3 controller for presigned URLs and metadata persistence
 * BACKEND CONTRACT: GET presign-upload/download, POST metadata
 * TODO: Validate keys and restrict paths per user
 */

const { query, body } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const s3 = require('../services/s3.service');

const validateUpload = [
  query('key').isString().notEmpty(),
  query('contentType').isString().notEmpty(),
  handleValidation,
];
async function presignUpload(req, res, next) {
  try {
    const { key, contentType } = req.query;
    const out = await s3.getPresignedUpload(key, contentType);
    res.json(out);
  } catch (err) {
    next(err);
  }
}

const validateDownload = [query('key').isString().notEmpty(), handleValidation];
async function presignDownload(req, res, next) {
  try {
    const out = await s3.getPresignedDownload(req.query.key);
    res.json(out);
  } catch (err) {
    next(err);
  }
}

const validateMetadata = [
  body('key').isString().notEmpty(),
  body('url').isString().notEmpty(),
  body('bucketPath').optional().isString(),
  body('contentType').optional().isString(),
  handleValidation,
];
async function saveMetadata(req, res, next) {
  try {
    const doc = await s3.saveMetadata({ ...req.body, uploaderId: req.user?._id });
    res.json({ s3Metadata: doc });
  } catch (err) {
    next(err);
  }
}

module.exports = { presignUpload, validateUpload, presignDownload, validateDownload, saveMetadata, validateMetadata };


