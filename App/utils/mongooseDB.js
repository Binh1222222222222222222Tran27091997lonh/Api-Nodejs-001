
// set up mongodb
const mongoClient = require('mongoose');

const MongooseDB = mongoClient.connect('mongodb://localhost/Api_Nodejs001',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=>{
        console.log('MongooseDB Ok!!!:)')
    })
    .catch((error) =>{
        console.log('MongooseDB Failed :(')
    });

module.exports = { MongooseDB };
