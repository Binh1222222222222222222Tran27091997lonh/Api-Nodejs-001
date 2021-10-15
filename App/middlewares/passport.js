

// Dictionary
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passportLocal = require('passport-local').Strategy;
// Create a develop
const { JWT_SECRET } = require('../configs/index');
const User = require('../models/userModels');

// passport
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET

}, async (payload, done) => {
    
    try{
        console.log('payload', payload)
        const user = await User.findById(payload.sub)
        if (!user) return done(null, false)
        done(null, user)
        
    }catch(error){
        done(error, false);
    }
}));


// Passport Local
passport.use(new passportLocal({
    usernameField: "email",

}, async (email, password, done)=>{
    try{
        const user = await User.findOne({ email })
        if (!user) return done (null, false)

        const isCorrectPassword = await user.isValidPassword(password)
        if (!isCorrectPassword) return done (null, false)
        return done(null, user)
    }catch (error){
        return done(error, false);
    }
}));






