const mongoose = require("../db/mongodb");
const Products = require("./productsmodel");
const Schema = mongoose.Schema;

const CartSchema = Schema({
  id: {
    type: String,
  },
  products: [
    {
      idproducto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
      },
      quantity: Number,
    },
  ],
});

CartSchema.virtual("Products", {
  ref: "Products",
  localField: "products.idproducto",
  foreignField: "_id",
});
module.exports = mongoose.model("Carts", CartSchema)