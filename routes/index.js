const express = require('express');

const router = express.Router();
const { auth } = require('../config/auth');

router.get('/', (req, res) => {
    res.render('welcome');
})

router.get('/dashboard', auth, (req, res) => {
    res.render('dashboard/index', {name: req.user.name});
})
module.exports = router;