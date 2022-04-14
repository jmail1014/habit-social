const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const {User,Comment} = require('../models');


const resolvers = {
    Query:{
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
            
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
          },
        
        users: async () => {
            return User.find()
            .select('-__v -password')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
        },
        comment: async (parent, { _id }, context, info) => {
            await Comment.findOne({_id});
        },

    },
    Mutation:{

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
        },
        addComment: async (parent, args, context) => {
          if (context.user) {
            const comment = await Comment.create({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { comments: comment._id } },
              { new: true }
            );
        
            return comment;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },

        addReaction: async (parent, {commentId, statusText}, context) => {
          if (context.user) {
            const reaction = await Comment.findByIdAndUpdate({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
              { _id: commentId},
              { $push: { reactions: { statusText, username: context.user.username } }  },
              { new: true, runValidators: true }
            );
        
            return reaction;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },
      }
};


module.exports = resolvers;