
const router = require('express-promise-router')();
const productsController = require('../controllers/Products');


// Products
router.route('/')
    .get(productsController.getProduct);


// modules
module.exports = router;
