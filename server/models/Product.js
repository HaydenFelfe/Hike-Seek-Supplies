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
    }
);

const Product = model('Product', productSchema);

module.exports = Product;