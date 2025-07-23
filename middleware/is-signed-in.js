const isSignedIn = (req, res, next) => {
    if (req.session.use) return next();
    res.redirect('/auth/sing-in');
};

module.exports = isSignedIn;