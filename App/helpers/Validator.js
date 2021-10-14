
const Joi = require('joi');

// Validate Body 
const validateBody = (schema)=>{
    return (req, res, next) => {
        const validatorBodyResult = schema.validate(req.body)

        if (validatorBodyResult.error){
            return res.status(400).json(validatorBodyResult.error)
        }else{
            if (!req.value) req.value = {}         
            if (!req.value['params'])  req.value.params = {} 
            
            req.value.body = validatorBodyResult.value
            next()
        }

    }

};


// Validate Id
const validateParam = (schema, name)=>{
    return (req, res, next) =>{
        
        const validatorResult = schema.validate({param: req.params[name]})
        
        if (validatorResult.error){
            return res.status(400).json(validatorResult.error)
        }else{
            
            if (!req.value) req.value = {}
            if (!req.value['params'])  req.value.params = {}
            
            req.value.params[name] = req.params[name]
            next()
        }
    }

};


// Id mongodb
const schemas = {
    // Auther Schema Sign In
    authSignInSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(9).required(),
    }), 

    // Auther Schema Sign Up
    authSignUpSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(9).required(),
    }), 

    // Decks User
    deckSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required(),
        total: Joi.number().required()
    }),

    // Id mongodb validatorParam
    idSchema: Joi.object().keys({
        param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    // User validateBody
    userSchema: Joi.object().keys({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
    }),

    // New Deck
    newDeckSchema: Joi.object().keys({
        name: Joi.string().min(6).required(),
        description: Joi.string().min(10).required(),
        total: Joi.number().required(),
        owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),

    })
    
};


module.exports= {
    validateBody,
    validateParam,
    schemas,
    
};














