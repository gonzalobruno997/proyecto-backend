const routerCart = require("express").Router();
const CartManager = require("../cartManager");
const carts = new CartManager("./db/carts.json");
const CartsModel = require("../models/cartsmodel");
const cartController = require("../controllers/CartController");

routerCart.get("/", cartController.getcarritoAll);

routerCart.get("/:cid", cartController.getcarrito);

routerCart.post("/", cartController.postcarrito);

routerCart.post("/:cid/product/:pid", cartController.postcarritoid);

routerCart.delete("/:cid", cartController.deletecarrito);

routerCart.delete("/:cid/product/:pid", cartController.deleteProductInCarrito);

module.exports = routerCart