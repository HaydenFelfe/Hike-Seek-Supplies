const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await user.findOne({ email });

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
                    { $addToSet: { cart: productId }},
                    { new: true }
                ).populate('cart');

                return updatedUser;
            } catch (error) {
                console.error('Error adding to cart:', error);
                throw new Error('Unable to add to cart');
            } 
        },
        removeFromCart: async (parent, { productId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Not logged in');
            }

            try {
                const updatedUser = await User.findByIdAndUpdate(
                    context.user._id,
                    { $pull: { cart: productId }},
                    { new: true }
                ).populate('cart');

                return updatedUser;
            } catch (error) {
                console.error('Error removing from cart:', error);
                throw new Error('Unable to remove from cart');
            }
        }
    },
};

module.exports = resolvers;
