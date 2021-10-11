const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 4050;

// Setup connection mongoDB instance
const mongodbClient = require('./utils/mongooseDB');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json())

const userRoute = require('./routes/userRoute');
// Routes
app.use('/users', userRoute);


// catch 404 error 
app.use((req, res, next) => {
    const Error = new Error('Not Found')
    err.status = 404
    next(err)
});

// Error handler function
app.use(()=>{
    const error = app.get('env') === "development" ? err : {}
    const status = err.status || 500 // loi ngoai y muon 
    // response to client error
    return res.status(status).json({
        error: {
            message: err.message,
        }
    })
});

// Start the server 
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
});