module.exports = function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }

    res.render('partials/loginRegisterForm');
}
