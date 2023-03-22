const {
    Router
} = require("express");
const authRouter = Router();
const passport = require("passport");
const authController = require("../controllers/AuthController");
const {
    authMiddleware,
    sessionValidation
} = require("../middleware/auth");

//LOGIN:
authRouter.get("/login", authController.loginView);

// authRouter.post("/login", sessionValidation, authController.loginUser);

authRouter.post("/login", passport.authenticate("login"), async (req, res) => {
    if (!req.user)
        return res
            .status(400)
            .send({
                status: "error",
                error: "Credenciales invalidas"
            });

    if (req.user.email === "adminCoder@coder.com") {
        req.session.user = {
            name: req.user.first_name,
            email: req.user.email,
            role: "Admin",
        };
        res.redirect("/");
    } else {
        req.session.user = {
            name: req.user.first_name,
            email: req.user.email,
            role: "Usuario",
        };
        res.redirect("/");
    }

    // res.send({ status: "success", payload: req.user });
});

//REGISTER:
authRouter.get("/register", authController.registerView);

authRouter.post(
    "/register",
    passport.authenticate("register", {
        successRedirect: "/auth/login"
    }),
    async (req, res) => {
        res.send({
            status: "success",
            message: "Usuario registrado con éxito"
        });
    }
);
//REGISTER CON GITHUB:
authRouter.get(
    "/github",
    passport.authenticate("github", {
        scope: ["user:email"]
    }),
    async (req, res) => {}
);

authRouter.get(
    "/githubcallback",
    passport.authenticate("github", {
        failureRedirect: "/auth/login"
    }),
    async (req, res) => {
        if (req.user.email === "adminCoder@coder.com") {
            req.session.user = {
                name: req.user.first_name,
                email: req.user.email,
                role: "Admin",
            };
            res.redirect("/");
        } else {
            req.session.user = {
                name: req.user.first_name,
                email: req.user.email,
                role: "Usuario",
            };
            res.redirect("/");
        }
    }
);

//LOGOUT:
authRouter.get("/logout", authController.logOutUser);

//RESET PASSWORD:
authRouter.get("/restorePassword", authController.restorePasswordView);

authRouter.post("/restorePassword", authController.restorePassword);

module.exports = authRouter;