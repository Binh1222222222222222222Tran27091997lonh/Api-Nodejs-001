

// module DB
const Product = require('../models/productModels');

// [GET] Product
const getProduct = async (req,res, next)=>{
    const product = await Product.find({})
    return res.status(200).json({product})
};


module.exports = {
    getProduct
};
