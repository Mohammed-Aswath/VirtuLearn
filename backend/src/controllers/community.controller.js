/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Community posts controller
 * BACKEND CONTRACT: GET list, POST create, DELETE remove
 * TODO: Add authorization checks for delete (owner or admin)
 */

const { body, query, param } = require('express-validator');
const { handleValidation } = require('../utils/validator');
const CommunityPost = require('../models/CommunityPost');

const validateList = [
  query('subject').optional().isString(),
  handleValidation,
];
async function list(req, res, next) {
  try {
    const filter = req.query.subject ? { subject: req.query.subject } : {};
    const posts = await CommunityPost.find(filter).sort({ createdAt: -1 }).lean();
    res.json(posts);
  } catch (err) {
    next(err);
  }
}

const validateCreate = [
  body('subject').isString().notEmpty(),
  body('title').isString().notEmpty(),
  body('body').optional().isString(),
  body('media').optional().isArray(),
  handleValidation,
];
async function create(req, res, next) {
  try {
    const { subject, title, body: text, media = [] } = req.body;
    const post = await CommunityPost.create({ teacherId: req.user._id, subject, title, body: text, media, createdAt: new Date() });
    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
}

const validateRemove = [param('id').isMongoId(), handleValidation];
async function remove(req, res, next) {
  try {
    await CommunityPost.findByIdAndDelete(req.params.id);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

const validateAddComment = [
  param('postId').isMongoId(),
  body('text').isString().notEmpty(),
  handleValidation,
];
async function addComment(req, res, next) {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const updated = await CommunityPost.findByIdAndUpdate(
      postId,
      { $push: { comments: { userId: req.user?._id, text, createdAt: new Date() } } },
      { new: true }
    ).lean();
    if (!updated) return res.status(404).json({ error: 'NotFound', message: 'Post not found', code: 404 });
    res.json({ post: updated });
  } catch (err) {
    next(err);
  }
}

module.exports = { list, validateList, create, validateCreate, remove, validateRemove, addComment, validateAddComment };


