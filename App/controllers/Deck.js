
// module DB
const User = require('../models/userModels');
const Deck = require('../models/userDeck');


// [GET] User
const getDeck = async (req, res, next)=>{
    const decks = await Deck.find({})
        return res.status(200).json({decks})

};

// [POST] Deck
const postDeck = async (req, res, next)=>{

    const owner = await User.findById(req.value.body.owner)

    const deck = req.value.body
    delete deck.owner
    deck.owner = owner._id
    const newDeck = new Deck(deck)
    await newDeck.save()

    // Add new created deck to the Decks
    owner.decks.push(newDeck._id)
    await owner.save()
        return res.status(201).json({deck: newDeck})

};

// Get DeckId
const getDeckId = async (req, res, next) => {
    const deck = await Deck.findById(req.value.params.deckID)
        return res.status(200).json({deck})

};


// put deckId
const putDeckId = async (req, res, next) =>{
    const {deckID } = req.value.params
    const newDeck = req.value.body
    const result = await Delete.findByIdAndUpdate(deckID, newDeck)
        return res.status(200).json({success: true})

};

// delete deckId
const deleteDeckId = async (req, res, next)=>{
    const {deckID } = req.value.params
    const deck = await Deck.findById(deckID)
    const ownerID = deck.owner
    const owner = await User.findById(ownerID)
    await deck.remove()
    owner.decks.pull(deck)
    await owner.save()
        return res.status(200).json({success: true})
};


module.exports = {
    getDeck, postDeck, getDeckId, putDeckId, deleteDeckId
};


