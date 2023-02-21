const ChatModel = require("../models/chatmodel");

const getchat = async () => {
    try {
        const messages = await ChatModel.find();

        return messages;
    } catch (error) {
        console.log(error);
    }
};
const newchat = async (chat, name) => {
    try {
        const msg = await new ChatModel({
            name: name,
            chat: chat,
        }).save();
        return msg;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getchat,
    newchat,
};