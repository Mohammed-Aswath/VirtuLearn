/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: AWS S3 client configuration
 * BACKEND CONTRACT: Provides initialized S3 client for presigned ops
 * TODO: Set AWS credentials via environment variables only
 */

const { S3Client } = require('@aws-sdk/client-s3');

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: process.env.AWS_ACCESS_KEY_ID
    ? {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined,
});

module.exports = { s3Client };


