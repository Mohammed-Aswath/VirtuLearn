/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: S3 routes for presigned URLs and metadata
 * BACKEND CONTRACT: GET presign-upload/download, POST metadata
 */

const router = require('express').Router();
const { verifyToken, attachUser } = require('../middlewares/auth.middleware');
const { presignUpload, validateUpload, presignDownload, validateDownload, saveMetadata, validateMetadata } = require('../controllers/s3.controller');

router.get('/presign-upload', verifyToken, attachUser, validateUpload, presignUpload);
router.get('/presign-download', validateDownload, presignDownload);
// Alias endpoint for community media upload convenience
// Frontend can POST file to S3 directly after fetching presigned URL; this alias keeps spec parity
// If direct upload is needed here, use multer and forward to S3 (not recommended for large files)
router.post('/metadata', verifyToken, attachUser, validateMetadata, saveMetadata);

module.exports = router;


