const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// GET VIEW / DIRECTORY FOR ALL USERS
router.get("/communityUsers", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render("communityUsers/index.ejs", {
      communityUsers: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
