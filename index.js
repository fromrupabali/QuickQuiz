const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const keys = require('./api/config/keys');
require('./api/services/passport');

const quizsRoutes = require('./api/routes/quizs');
const userRoutes = require('./api/routes/users');
const authRoutes = require('./api/routes/authRoutes');



mongoose.connect(keys.mongoURI);

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CORS Handling
app.use((req, res,next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With,Content-Type, Accept, Authorization'
     );
     if(req.method === 'OPTIONS'){
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
     }
    next();
});

app.use(passport.initialize());

app.use('/quizs', quizsRoutes);
app.use('/users', userRoutes);
app.use('/auth/google', authRoutes);




app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

const port = process.env.PORT || 5000;
app.listen(port);