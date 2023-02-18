const mongoose = require("../db/mongodb");
const Schema = mongoose.Schema;

const chatSchema = Schema({
    name: {
        type: String,
    },
    chat: {
        type: String,
    },
});
module.exports = mongoose.model("Messages", chatSchema);