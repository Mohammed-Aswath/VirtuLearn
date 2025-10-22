/*
 * GENERATED/EDITED BY CURSOR — PURPOSE: Mongoose model for Community posts
 * BACKEND CONTRACT: Stores teacher posts and attachments (S3 URLs)
 * TODO: Add full-text search index if needed
 */

const { Schema, model } = require('mongoose');

const MediaSchema = new Schema(
  {
    type: { type: String, enum: ['pdf', 'image', 'video', 'link'], required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const CommunityPostSchema = new Schema(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    subject: { type: String, required: true, index: true },
    title: { type: String, required: true },
    body: { type: String },
    media: { type: [MediaSchema], default: [] },
    createdAt: { type: Date, default: Date.now },
    comments: { type: [CommentSchema], default: [] },
  },
  { timestamps: false }
);

module.exports = model('CommunityPost', CommunityPostSchema);


