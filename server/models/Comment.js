const { Schema, model } = require('mongoose');

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

    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
  CommentSchema.virtual('Count').get(function() {
    return this.replies.length;
  });

const Comment = model('Comment',CommentSchema)

module.exports = Comment;
