const express = require('express');
const mongoose = require('mongoose');
const app = express();
const flash  = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//passport config
require('./config/passport')(passport);

const PORT = process.env.PORT || 5000;
//DB config and connection
const db =  require('./config/keys').mongodbURI;
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log('MongoDB Connected...'))
    .catch( err => console.log(err))

//BodyParser
app.use(express.urlencoded({extended: false}));

//Template engine 
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('./public'));

//Session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash to the app
app.use(flash());

//set global variables
app.use( (req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routing of the system 
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

app.listen(PORT, console.log(`Server started on ${PORT}.`));