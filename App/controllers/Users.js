
// module DB
const User = require('../models/userModels');
const Product = require('../models/productModels');

// [GET] User
const getUser = async (req, res, next)=>{
    // callback way
    const users = await User.find({})
    return res.status(200).json({users})
};

// [POST] User 
const postUser = (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save()
        .then(user => {
            return res.status(200).json("Save User Ok :)")
        })
        .catch(err => next(err))
}

// [GET] Product
const getProduct = async (req, res, next)=>{
    const products = await Product.find({})
    return res.status(200).json({products})

};

module.exports = {
    getUser, postUser,
    getProduct

}