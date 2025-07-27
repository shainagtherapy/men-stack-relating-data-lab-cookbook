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
        const commUser = await User.findById(req.params._id); //_id or username?**********
        res.render('communityUsers/show.ejs', { // ******** this line is the error
            commUser: commUser,
        });
    } catch (error) {
        // If any errors, log them and redirect back home
        console.log(error);
        res.redirect('/communityUsers');
    }
});

module.exports = router;
