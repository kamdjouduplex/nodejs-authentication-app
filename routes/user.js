const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const passport = require('passport');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('user/login', {title: 'Login Form'});
})

//display the register form
router.get('/register', (req, res) => {
    res.render('user/register', {title: 'Register Form'});
})

//handle the registration on form submit
router.post('/register', (req, res) => {
    const { name, email, password, cpassword } = req.body;
    const newUser = new User({
        name,
        email,
        password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                .then( user => {
                    req.flash('success_msg', 'You are now registered and you can login.');
                    res.redirect('/user/login');
                })
                .catch( (err) => console.log(err))
        })
    });
})


//handle the login post request
router.post('/login', (req, res, next) => {
    passport.authenticate('local', 
        { 
            successRedirect: '/dashboard',
            failureRedirect: '/user/login',
            failureFlash: true
    })(req, res, next);
})

//Logout handler
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/user/login');
})


module.exports = router;