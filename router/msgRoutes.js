const express = require("express");
const router = express.Router();
const Chatmodel = require("../models/chatmodel");

router.get("/", async (req, res) => {
    try {
        const messages = await Chatmodel.find();
        res.send(messages);
    } catch (error) {
        console.log(error);
    }
});
router.post("/", async (req, res) => {
    try {
        console.log("reqqqq2", req.body);
        const msg = await new Chatmodel({
            name: req.body.name,
            chat: req.body.chat,
        }).save();

        console.log("msg", msg);
        res.send("el mensaje se ha guardado satisfactoriamente");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;