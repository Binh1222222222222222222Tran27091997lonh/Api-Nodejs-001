
const express = require('express');
const router = require('express-promise-router')();
const userControllers = require('../controllers/Users');


// User
router.route('/')
    .get(userControllers.getUser)
    .post(userControllers.postUser)

// User ID
router.route('/:userID')
    .get(userControllers.getUserId)
    .put(userControllers.putUserId) // replace

// User ID Decks
router.route('/:userID/decks')
    .get(userControllers.getUserDeck)
    .post(userControllers.postUserDeck)


// Product
router.route('/products')
    .get(userControllers.getProductId)
    


// Product ID
router.route('/products/:productID')
    .get(userControllers.getProductId)
    .patch(userControllers.patchProductId) // update 

module.exports = router;

