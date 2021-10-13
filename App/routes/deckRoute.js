
const router = require('express-promise-router')();
const deckControllers = require('../controllers/Deck');


// Validator cho parameters 
const { validateBody, validateParam, schemas } = require('../helpers/Validator');


// User
router.route('/')
    .get(deckControllers.getDeck)
    .post(validateBody(schemas.newDeckSchema) ,deckControllers.postDeck)


router.route('/:deckID')
    .get(validateParam(schemas.idSchema, "deckID"), deckControllers.getDeckId)
    .put(validateParam(schemas.idSchema, 'deckID'), validateBody(schemas.newDeckSchema), deckControllers.putDeckId)
    .delete(validateParam(schemas.idSchema, 'deckID'), deckControllers.deleteDeckId);


module.exports = router;

