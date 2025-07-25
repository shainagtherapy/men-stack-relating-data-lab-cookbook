const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET / for login index
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
router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
});

// POST / create (submit new item)
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.pantry.push(req.body); 

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

// SHOW / reveal food pantry index
router.get('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/index.ejs', {
            food: food
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});




module.exports = router;