const express = require("express");
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const morgan =require("morgan")
const userRoutes = require("./routes/user");
const bookingRoutes = require("./routes/Booking");  
const indexRoutes = require("./routes/index");
const flightRoutes = require("./routes/flight");

const app = express();

// إعدادات body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// إعدادات Express
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//connected to DB
mongoose.connect(process.env.url, )
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log(err));
//session
app.use(session({
    secret: process.env.session,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } //true if you use HTTPS
}));


app.use(flash());

app.use((req, res, next) => {
    res.locals.messages = {
        success_msg: req.flash('success_msg'),
        error_msg: req.flash('error_msg')
    };
    next();
});
 
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
app.use(morgan("dev"))
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/booking', bookingRoutes);
app.use('/flight', flightRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
