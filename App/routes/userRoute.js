
const express = require('express');
const router = require('express-promise-router')();
const userControllers = require('../controllers/Users');
const passport = require('passport');


// Passport
const passportConfig = require('../middlewares/passport');

// Validator cho parameters 
const { validateBody, validateParam, schemas } = require('../helpers/Validator');


// Sign up
router.route('/signup')
    .post(validateBody(schemas.authSignUpSchema), userControllers.signUp)


// Sign in 
router.route('/signin')
    .post(validateBody(schemas.authSignInSchema), userControllers.signIn)


// Secret test passport
router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }) ,userControllers.secret)

// User
router.route('/')
    .get(userControllers.getUser)
    .post(validateBody(schemas.userSchema), userControllers.postUser)

// User ID
router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID') ,userControllers.getUserId)
    .put(
        validateParam(schemas.idSchema, 'userID'), 
        validateBody(schemas.userSchema), userControllers.putUserId) // replace

// User ID Decks
router.route('/:userID/decks')
    .get(
        validateParam(schemas.idSchema, 'userID'), 
        userControllers.getUserDeck)
    .post(
        validateParam(schemas.idSchema, 'userID'), 
        validateBody(schemas.deckSchema), 
        userControllers.postUserDeck)



// Product ID
router.route('/products/:productID')
    .get(userControllers.getProductId)
    .patch(userControllers.patchProductId) // update 

module.exports = router;

