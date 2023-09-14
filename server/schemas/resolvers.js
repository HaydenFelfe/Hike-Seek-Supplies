const { AuthenticationError } = require('apollo-server-express');
const { ApolloError } = require('apollo-server-express');
const { User, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );

        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
    getAllProducts: async () => {
      return await Product.find();
    },
    getCampingProducts: async () => {
      return await Product.find({ category: 'camping' });
    },
    getHikingProducts: async () => {
      return await Product.find({ category: 'hiking' });
    },
    getWaterProducts: async () => {
      return await Product.find({ category: 'water' });
    },
    getSnowProducts: async () => {
      return await Product.find({ category: 'snow' });
    },
    getTravelProducts: async () => {
      return await Product.find({ category: 'travel' });
    },
    getUsedProducts: async () => {
      return await Product.find({ isUsed: true });
    },
    getDiscountedProducts: async () => {
      return await Product.find({ isOnSale: true });
    },
    getUserCart: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const userData = await User.findById(context.user._id).populate('cart');

      return userData.cart;
    },
    getProductBySlug: async (parent, { slug }) => {
      try {
        const product = await Product.findOne({ slug });
        return product;
      } catch (error) {
        console.error('Error fetching product by slug:', error);
        throw new Error('Unable to fetch product by slug');
      }
    },
    searchProducts: async (parent, { query }, context) => {
        try {
          console.log(`Searching for products with query: ${query}`);
      
          // Use Mongoose to search for products based on the query
          // We'll search for products that match the 'title' or 'description' fields
          const searchResults = await Product.find({
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'title'
              { description: { $regex: query, $options: 'i' } }, // Case-insensitive search for 'description'
            ],
          });
      
          console.log(`Found ${searchResults.length} results.`);
      
          return searchResults;
        } catch (error) {
          console.error('Error searching for products:', error);
          throw new Error('Unable to search for products');
        }
      },
    },
  
  

    Mutation: {
      addUser: async (parent, args) => {
        try {
          // Attempt to create the user
          const user = await User.create(args);
          const token = signToken(user);
          return { user, token };
        } catch (error) {
          if (error.code === 11000) {
            if (error.keyPattern.username === 1) {
              // Handle duplicate username error
              throw new ApolloError('Username is already taken', 'DUPLICATE_USERNAME');
            } else if (error.keyPattern.email === 1) {
              // Handle duplicate email error
              throw new ApolloError('Email is already taken', 'DUPLICATE_EMAIL');
            }
          } else if (error.errors && error.errors.password) {
            // Handle invalid password format error
            throw new ApolloError(error.errors.password.message, 'INVALID_PASSWORD_FORMAT');
          } else {
            // Handle other errors
            throw new ApolloError('Error creating user', 'USER_CREATION_ERROR');
          }
        }
      },
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
      addToCart: async (parent, { productId }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
  
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $addToSet: { cart: productId } },
            { new: true }
          ).populate('cart');
  
          return updatedUser.cart;
        } catch (error) {
          console.error('Error adding to cart:', error);
          throw new ApolloError('Unable to add to cart');
        }
      },
      removeFromCart: async (parent, { productId }, context) => {
        if (!context.user) {
          throw new AuthenticationError('Not logged in');
        }
  
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $pull: { cart: productId } },
            { new: true }
          ).populate('cart');
  
          return updatedUser.cart;
        } catch (error) {
          console.error('Error removing from cart:', error);
          throw new ApolloError('Unable to remove from cart');
        }
      },
    },
  };

module.exports = resolvers;
