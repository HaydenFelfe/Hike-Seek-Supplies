const { Schema, model } = require('mongoose');

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String, // URL
            required: true,
        },
        productId: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: String,
            enum: ['camping', 'hiking', 'snow', 'water', 'travel'],
            required: true,
        },
        isUsed: {
            type: Boolean,
            default: false,
        },
        isOnSale: {
            type: Boolean,
            default: false,
        },
        discountPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
    }
);

const Product = model('Product', productSchema);

module.exports = Product;