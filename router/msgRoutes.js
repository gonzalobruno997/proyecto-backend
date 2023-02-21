const express = require("express");
const router = express.Router();
const Chatmodel = require("../models/chatmodel");
const chatController = require("../controllers/ChatController");

router.get("/", chatController.getchats);

router.post("/", chatController.postchat);

module.exports = router;