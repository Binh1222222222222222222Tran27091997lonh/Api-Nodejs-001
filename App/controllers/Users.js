
// module DB
const User = require('../models/userModels');
const Product = require('../models/productModels');
const Deck = require('../models/userDeck');

// [GET] User
const getUser = async (req, res, next)=>{
    // callback way
    const users = await User.find({})
    return res.status(200).json({users})
};

// [POST] User 
const postUser = async (req, res, next) => {
    const newUser = new User(req.body)
    await newUser.save()
        return res.status(201).json("Save User Ok :)")
        
        
};

// [GET] User Id
const getUserId = async (req, res, next)=>{
    const {userID} = req.params 
    const user = await User.findById(userID)
        return res.status(200).json({user})

};

// [PUT] user replace 
const putUserId = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.params
    const newUser = req.body
    const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})

};
// [GET] User Decks
const getUserDeck = async (req, res, next) => {
    const { userID } = req.params
    const user = await User.findById(userID).populate('decks')
        return res.status(200).json({deck: user})
};
// [POST] User Decks
const postUserDeck = async (req, res, next) => {
    const { userID } = req.params
    const newDeck = new Deck(req.body)
    const user = await User.findById(userID)
    newDeck.owner = user
    await newDeck.save()
    user.decks.push(newDeck._id)
    await user.save()
        return res.status(200).json({deck: newDeck})
};

// [GET] Product
const getProduct = async (req, res, next)=>{
    const products = await Product.find({})
    return res.status(200).json({products})

};
// [GET] Product ID
const getProductId = async (req, res, next)=>{
    const { productID } = req.params
    const product = await Product.findById(productID)
        return res.status(200).json({product})
};

// [PATCH] update product
const patchProductId = async (req, res, next)=>{
    // number of fields
    const { productID } = req.params
    const newProduct = req.body
    const result = await Product.findByIdAndUpdate(productID, newProduct)
        return res.status(200).json({success: true})

};





module.exports = {
    getUser, postUser, getUserId, putUserId, 
    getProduct, getProductId, patchProductId, 
    getUserDeck, postUserDeck
    
    

};