const express = require('express');
const router = express.Router();
//const User = require('../models/user.js');

// GET VIEW / DIRECTORY FOR ALL USERS
router.get('/users', async (req, res) => {
    try {
        const allUsers = await User.findByUsername;
        
        res.render('users/index.ejs', {
            users: allUsers,
        })

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;