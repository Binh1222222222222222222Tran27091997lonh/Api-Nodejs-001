
 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs')

// Set up model user
const UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, unique: true, lowercase:true},
    password: {type: String, required: true},
    decks: [{type: Schema.Types.ObjectId, ref: 'Deck'}],
});

// password encryption
UserSchema.pre('save', async function(next){
    try{
        //
        const salt = await bcryptjs.genSalt(15)
        // password hash (salt + hash)
        const passwordHash = await bcryptjs.hash(this.password, salt)
        // reassign password hash
        this.password = passwordHash

        next()
    }catch(error) {
        next(error);
    }
});
//
UserSchema.methods.isValidPassword = async function(newPassword){
    try{
        return await bcryptjs.compare(newPassword, this.password)

    }catch(error){
        throw new Error(error);
    }
};
const User = mongoose.model('User',UserSchema)
module.exports = User;
