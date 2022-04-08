const { Schema, model } = require('mongoose');
const CommentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');


const statusSchema = new Schema(
{
    statusText: {
        type: String,
        required: 'You need to leave a Status!',
        minlength: 1,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
},
    {
    toJSON: {
        getters: true
        }
    }
);

  
  const Status = model('Status', statusSchema);
  
  module.exports = Status;