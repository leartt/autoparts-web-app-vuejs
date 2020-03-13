const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,  
    },
    productImage: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;