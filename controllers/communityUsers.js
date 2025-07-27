const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// GET index / DIRECTORY FOR ALL USERS
router.get("/communityUsers", async (req, res) => {
  try {
    const allUsers = await User.find(req.params.username);
    res.render("communityUsers/index.ejs", {
      communityUsers: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// SHOW ROUTE - links to communityUsers
router.get('/:id', async (req, res) => {
    try {
        const commUser = await User.findById(req.params.id) 
        res.render('communityUsers/show.ejs', {
            commUser: commUser,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/communityUsers');
    }
});

module.exports = router;
