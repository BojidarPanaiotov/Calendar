
module.exports = {
    login: async function login(req, res, user, password) {
        const bcrypt = require("bcryptjs");

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = user;

            res.redirect("/");
        } else {
            res.status(400).send("Invalid credentials");
        }
    }
}