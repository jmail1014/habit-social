const { Schema, model } = require('mongoose');
const reactionSchema = require('./Status');
const dateFormat = require('../utils/dateFormat');

const CommentSchema = new Schema(
    {
      username: {
        type: String,
        required: true
      },
      commentText: {
        type: String,
        required: 'You need to leave a Comment!',
        minlength: 1,
        maxlength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
      reactions: [reactionSchema]
    },
    {
      toJSON: {
        getters: true
      },
    }
  );
  CommentSchema.virtual('Count').get(function() {
    return this.reactions.length;
  });

const Comment = model('Comment',CommentSchema)

module.exports = Comment;
