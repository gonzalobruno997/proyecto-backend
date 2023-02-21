const mongoose = require("../db/mongodb");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    code: {
        type: String,
        unique: true,
    },
    stock: {
        type: Number,
    },
    idproducto:{
        type: Number
    }
});
module.exports = mongoose.model("Products", ProductSchema)