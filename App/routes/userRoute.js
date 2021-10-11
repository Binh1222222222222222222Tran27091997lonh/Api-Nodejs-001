
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/Users');



router.route('/')
    .get(userControllers.getUser)
    .post(userControllers.postUser)

router.route('/products')
    .get(userControllers.getProduct);






module.exports = router;

