/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: S3 presign upload/download and metadata persistence
 * BACKEND CONTRACT: getPresignedUpload, getPresignedDownload, saveMetadata
 * TODO: Harden key validation and add ACL policies as needed
 */

const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { s3Client } = require('../config/s3');
const S3Metadata = require('../models/S3Metadata');

const BUCKET = process.env.AWS_S3_BUCKET;

/**
 * @param {string} key
 * @param {string} contentType
 * @returns {Promise<{url: string}>}
 */
async function getPresignedUpload(key, contentType) {
  const cmd = new PutObjectCommand({ Bucket: BUCKET, Key: key, ContentType: contentType });
  const url = await getSignedUrl(s3Client, cmd, { expiresIn: 60 * 5 });
  return { url };
}

/**
 * @param {string} key
 * @returns {Promise<{presignedUrl: string}>}
 */
async function getPresignedDownload(key) {
  const cmd = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  const presignedUrl = await getSignedUrl(s3Client, cmd, { expiresIn: 60 * 5 });
  return { presignedUrl };
}

/**
 * @param {{ key:string, url:string, uploaderId?:string, bucketPath?:string, contentType?:string }} metadata
 */
async function saveMetadata(metadata) {
  const doc = await S3Metadata.findOneAndUpdate(
    { key: metadata.key },
    { ...metadata, uploadedAt: new Date() },
    { upsert: true, new: true }
  );
  return doc.toObject();
}

module.exports = { getPresignedUpload, getPresignedDownload, saveMetadata };


