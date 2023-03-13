const userModel = require("../models/user");
const {
    createHash
} = require("../utils/index");

// REGISTER:
const createUser = async (req) => {
    const {
        first_name,
        last_name,
        age,
        email,
        password
    } = req;
    let newUser = {
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
    };

    try {
        let user = await userModel.findOne({
            email: req.email
        });
        if (user) {
            return "usuario ya registrado";
        }
        let response = await userModel.create(newUser);
    } catch (error) {
        console.log(error);
        res.send("register error");
    }
};

module.exports = {
    createUser
};