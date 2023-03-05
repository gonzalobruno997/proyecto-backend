const msgservices = require("../services/msgServices");

const getchats = async (req, res) => {
    try {
        const messages = await msgservices.getchat();
        console.log("messages2", messages);
        res.send(messages);
    } catch (error) {
        console.log(error);
    }
};
const postchat = async (req, res) => {
    try {
        const {
            chat,
            name
        } = req.body;
        const msg = await msgservices.newchat(chat, name);
        res.send(msg);
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getchats,
    postchat,
};
