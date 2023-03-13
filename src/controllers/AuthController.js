const authService = require("../services/authServices");
const userModel = require("../models/user");
const {
    isValidPassword
} = require("../utils/index");
const {
    createHash
} = require("../utils/index");

//LOGIN:
const loginView = async (req, res) => {
    try {
        res.render("login");
    } catch (error) {
        res.send(error.message);
    }
};

//La contraseña se hashea automaticamente, por lo que se ha creado en la base de datos un usuario con los datos de admin propuestos.
const loginUser = async (req, res) => {
    try {
        let user = req.body;
        let foundUser = await userModel.findOne({
            email: user.email
        });

        if (!foundUser || !isValidPassword(foundUser, user.password)) {
            res.send("login error. Usuario no existe o contraseña incorrecta.");
        }

        if (foundUser.email === "adminCoder@coder.com") {
            req.session.user = {
                name: foundUser.first_name,
                email: foundUser.email,
                role: "Admin",
            };
            res.redirect("/");
        } else {
            req.session.user = {
                name: foundUser.first_name,
                email: foundUser.email,
                role: "Usuario",
            };
            res.redirect("/");
        }
    } catch (error) {
        res.send(error.message);
    }
};

//LOGOUT:
const logOutUser = async (req, res) => {
    try {
        req.session.destroy((error) => {
            res.redirect("/login");
        });
    } catch (error) {
        res.send(error.message);
    }
};

//REGISTER:
const registerView = async (req, res) => {
    try {
        res.render("register");
    } catch (error) {
        res.send(error.message);
    }
};

const registerUser = async (req, res) => {
    try {
        const user = await authService.createUser(req.body);
        res.redirect(302, "/login");
        res.send(user);
    } catch (error) {
        res.send(error.message);
    }
};

//RESTORE PASSWORD:
const restorePasswordView = async (req, res) => {
    res.render("restore-password");
};

const restorePassword = async (req, res) => {
    try {
        let user = req.body;
        let foundUser = await userModel.findOne({
            email: user.email
        });

        if (!foundUser) {
            res.render("register");
        } else {
            let newPassword = createHash(user.password);
            let result = await userModel.updateOne({
                email: user.email
            }, {
                $set: {
                    password: newPassword
                }
            });
            res.render("login");
        }
    } catch (error) {
        res.send(error.message);
    }
};

module.exports = {
    loginView,
    loginUser,
    registerView,
    registerUser,
    logOutUser,
    restorePasswordView,
    restorePassword,
};