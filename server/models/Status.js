const { Schema, model } = require('mongoose');
//const CommentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');


const statusSchema = new Schema(
{
    statusText: {
        type: String,
        required: true,
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
module.exports = statusSchema;
