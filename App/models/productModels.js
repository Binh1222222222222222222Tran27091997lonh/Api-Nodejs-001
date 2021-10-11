
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Set up model products
const ProductSchema = new Schema({
    name: {type: String},
    category: {type: String},
    price: {type: String},
    number: {type: String},
});


const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;