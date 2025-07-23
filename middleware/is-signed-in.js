const isSignedIn = (req, res, next) => {
    if (req.session.use) return next();
    res.redirect('/auth/sign-in');
};

module.exports = isSignedIn;