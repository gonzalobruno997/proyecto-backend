const express = require("express");
const router = express.Router();
const Chatmodel = require("../models/chatmodel");

router.get("/", (req, res) => {
    try {
        res.json({
            msg: "You are in"
        });
        // res.send(chat);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;