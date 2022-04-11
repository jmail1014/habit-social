const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const {User,Comment,Status,Product,Category,Order} = require('../models');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query:{
      categories: async () => {
        return await Category.find();
      },
      products: async (parent, { category, name }) => {
        const params = {};
  
        if (category) {
          params.category = category;
        }
  
        if (name) {
          params.name = {
            $regex: name
          };
        }
  
        return await Product.find(params).populate('category');
      },
      product: async (parent, { _id }) => {
        return await Product.findById(_id).populate('category');
      },
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
        checkout: async (parent, args, context) => {
          const url = new URL(context.headers.referer).origin;
          const order = new Order({ products: args.products });
          const line_items = [];
    
          const { products } = await order.populate('products').execPopulate();
    
          for (let i = 0; i < products.length; i++) {
            const product = await stripe.products.create({
              name: products[i].name,
              description: products[i].description,
              images: [`${url}/images/${products[i].image}`]
            });
    
            const price = await stripe.prices.create({
              product: product.id,
              unit_amount: products[i].price * 100,
              currency: 'usd',
            });
    
            line_items.push({
              price: price.id,
              quantity: 1
            });
          }
    
          const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${url}/`
          });
    
          return { session: session.id };
        }

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
              { $push: { commentText:commentText} },
              { new: true }
            );
        
            return comment;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },

        addReaction: async (parent, args, context) => {
          if (context.user) {
            const reaction = await Status.create({ ...args, username: context.user.username });
        
            await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $push: { statusText:statusText} },
              { new: true }
            );
        
            return reaction;
          }
        
          throw new AuthenticationError('You need to be logged in!');
        },

        addOrder: async (parent, { products }, context) => {
          console.log(context);
          if (context.user) {
            const order = new Order({ products });
    
            await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });
    
            return order;
          }
    
          throw new AuthenticationError('Not logged in');
        },

        updateProduct: async (parent, { _id, quantity }) => {
          const decrement = Math.abs(quantity) * -1;
    
          return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
      }
};


module.exports = resolvers;