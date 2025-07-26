const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

// GET / for login index
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        res.render('foods/index.ejs', {
            pantry: currentUser.pantry,
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

        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

// reveal food pantry index
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        
        res.render('/foods', {
            pantry: currentUser.pantry,
        })

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// EDIT / get 
router.get('/:foodId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        res.render('foods/edit.ejs', {
            food: food,
        })
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// UPDATE / put
router.put('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const food = currentUser.pantry.id(req.params.foodId);
        food.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser.id}/foods`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

// // DELETE
router.delete('/:foodId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);

        currentUser.pantry.id(req.params.foodId).deleteOne();

        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/foods`);

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})


module.exports = router;