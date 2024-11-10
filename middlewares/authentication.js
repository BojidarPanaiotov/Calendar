module.exports = function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }

    res.render('partials/loginRegisterForm');
}
