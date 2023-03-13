const authMiddleware = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.render("login", {
            status: "failed"
        });
    }
};

const sessionValidation = (req, res, next) => {
    if (!req.session.user) {
        next();
    } else {
        res.send("Ya estas loggeado");
    }
};

module.exports = {
    authMiddleware,
    sessionValidation
};