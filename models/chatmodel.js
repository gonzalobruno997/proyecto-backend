const mongoose = require("../db/mongodb");
const Schema = mongoose.Schema;

const chatSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    chat: [{
        author: String,
        message: String
    }],
});
module.exports = mongoose.model("Chatmsg", chatSchema);