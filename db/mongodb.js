const mongoose = require("mongoose");

const uri =
    "mongodb+srv://gonzalobruno997:1234@cluster0.zjno9zw.mongodb.net/chat?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("DB Connected"));
module.exports = mongoose;