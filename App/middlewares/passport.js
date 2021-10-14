
const passport = require('passport');
const passport_jwt = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { JWT_SECRET } = require('../configs/index');
const User = require('../models/userModels');
//
passport.use(new passport_jwt({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: JWT_SECRET,
}, async (payload, done) => {
    
    try{
        const user = await User.findById(payload.sub)
        if (!user) return done(null, false)
        done(null, user)
    }catch(error){
        done(error, false);
    }
}));








