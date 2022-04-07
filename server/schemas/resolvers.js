const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcryptjs')

const resolvers = {
    Query:{

    },
    Mutation:{
        login: async (parent, { username, password }, context, info) => {
            const user = await context.user({ username })
           
            if (!user) {
                throw new AuthenticationError('Invalid Login')
              }
              const passwordMatch = await bcrypt.compare(password, user.password)

              if (!passwordMatch) {
                throw new AuthenticationError('Invalid Login')
              }
              const token = signToken(user);
              return { token, user };
        },
        addUser: async (parent,{username,email,password},context,info)=>{
            const hashedPassword = await bcrypt.hash(password,10)
            // Not sure how to add the email here
            const user = await context.user.createUser({
                username,
                //eamil
                password:hashedPassword,
            })
            return user
        },
    },
    addComment:async(parent,args,context,info) => {
        const user = await context.user({ username })
    }
        
};   


module.exports = resolvers;