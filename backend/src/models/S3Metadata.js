/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for S3 object metadata
 * BACKEND CONTRACT: Tracks file uploads and locations
 * TODO: Add lifecycle policies in S3 bucket as ops task
 */

const { Schema, model } = require('mongoose');

const S3MetadataSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    uploaderId: { type: Schema.Types.ObjectId, ref: 'User' },
    bucketPath: { type: String },
    contentType: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = model('S3Metadata', S3MetadataSchema);


