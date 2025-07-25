const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// INDEX
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('foods/index.ejs', {
            foods: currentUser.foods,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

// NEW
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs')
})






module.exports = router;