
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
require('pretty-error').start();
require('dotenv').config();
console.log(process.env.test)

// CONFIG
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/travel_users_api'

// DB

// Connect to Mongo

mongoose.connect(mongoURI, { useMongoClient: true });
const db = mongoose.connection;
db.on('error', (err) => console.log('Mongo error: ', err));
db.on('connected', () => console.log('Mongo connected at: ', mongoURI));
db.on('disconnected', () => console.log('Mongo disconnected'));
mongoose.Promise = global.Promise;

// CONTROLLERS
const travelsController = require('./controllers/travelsController.js');
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
    secret: 'Yeah',
    resave: true,
    saveUninitialized: false,
    maxAge: 2592000000
}));


app.use('/travels', travelsController);
app.use('/users', usersController);
app.use('/sessions', sessionsController);

app.get('/test', (req, res) => {

    res.send(req.session);
});

//original
app.get('/travelkey', (req, res) => {
    res.send({ travelauth: process.env.travelauth });
});

//links
app.get('/hotelsParis', (req, res) => {
    res.send({ hotelsParis: process.env.hotelsParis });
});


app.get('/hotelsJamaica', (req, res) => {
    res.send({ hotelsJamaica: process.env.hotelsJamaica });
});

app.get('/hotelsLondon', (req, res) => {
    res.send({ hotelsLondon: process.env.hotelsLondon });
});










// LISTEN
app.listen(PORT, () => {
    console.log('=======================');
    console.log('Running on PORT ' + PORT);
    console.log('=======================');
});
