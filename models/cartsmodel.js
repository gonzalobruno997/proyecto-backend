const mongoose = require("../db/mongodb");
const Schema = mongoose.Schema;

const CartSchema = Schema({
    id: {
        type: String,
    },
    products: [{
        idproducto: {
            type: Number,
            unique: true
        },
        quantity: Number,
    }, ],
});
module.exports = mongoose.model("Carts", CartSchema);