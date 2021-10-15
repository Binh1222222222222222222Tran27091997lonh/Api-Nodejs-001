

// jsonwebtoken
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/index');
// encodeToken
const encodeToken = (userID)=>{
    return JWT.sign({
        iss: "Kim Xuyen",
        sub: userID,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 7)
    }, JWT_SECRET)
};

// Create at Develop
// module DB
const User = require('../models/userModels');
const Product = require('../models/productModels');
const Deck = require('../models/userDeck');




// [POST] signUp
const signUp = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.value.body

    const foundUser = await User.findOne({ email })
    const passwordFound = await User.findOne({ password })
    if (foundUser) return res.status(403).json({error: {message: "Email already exists :(" }})
    if (passwordFound) return res.status(403).json({error: {message: "Password already exists :("}})
    // Create a new user 
    const newUser = new User({email, password, firstName, lastName})
    newUser.save()
    const token = encodeToken(newUser._id)
    res.setHeader('Authorization', token)
        return res.status(200).json({success: true})

};


//[POST] signIn
const signIn = async (req, res, next) => {
    const token = encodeToken(req.user._id)
    res.setHeader("Authorization", token)
    return res.status(200).json({success: true})

};


// [GET] secret
const secret = async (req, res, next) =>{
    console.log('true secret')
    return res.status(200).json({resource: true})
    
};

// [GET] User
const getUser = async (req, res, next)=>{

    // callback way
    const users = await User.find({})
    return res.status(200).json({users})

};


// [POST] User 
const postUser = async (req, res, next) => {
    const newUser = new User(req.value.body)
    await newUser.save()
        return res.status(201).json("Save User Ok :)")
   
};


// [GET] User Id
const getUserId = async (req, res, next)=>{

    const {userID} = req.value.params 
    const user = await User.findById(userID)
        return res.status(200).json({user})

};


// [PUT] user replace 
const putUserId = async (req, res, next) => {
    // enforce new user to old user
    const { userID } = req.value.params
    const newUser = req.value.body
    const result = await User.findByIdAndUpdate(userID, newUser)
        return res.status(200).json({success: true})

};


// [GET] User Decks
const getUserDeck = async (req, res, next) => {
    const { userID } = req.value.params
    const user = await User.findById(userID).populate('decks')
        return res.status(200).json({deck: user})
};


// [POST] User Decks
const postUserDeck = async (req, res, next) => {
    const { userID } = req.value.params
    const newDeck = new Deck(req.value.body)
    const user = await User.findById(userID)
    newDeck.owner = user
    await newDeck.save()
    user.decks.push(newDeck._id)
    await user.save()
        return res.status(200).json({deck: newDeck})
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
    getProductId, patchProductId, 
    getUserDeck, postUserDeck, 
    signIn, signUp, secret,
    
    

};