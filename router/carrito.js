/* const routerCart = require("express").Router()
const CartManager = require("../cartManager")
const carts = new CartManager("./db/carts.json")

routerCart.get("/:cid", async (req, res) => {
    const {cid} = req.params
    if(cid){
        await carts.getCartById(cid).then(result => res.json(result))
    }else{
        res.json({"error":"id was not specified"})
    }
})
routerCart.post("/", async (req, res) => {
    await carts.addCart().then(result => res.json(result))
})
routerCart.post("/:cid/product/:pid",async (req, res) => {
    const {cid, pid} = req.params
    await carts.addProductCart(cid, pid).then(result => res.json(result) )
})
module.exports = routerCart */
const routerCart = require("express").Router();
const CartManager = require("../cartManager");
const carts = new CartManager("./db/carts.json");
const CartsModel = require("../models/cartsmodel");

routerCart.get("/:cid", async (req, res) => {
    const {
        cid
    } = req.params;
    if (cid) {
        const cartid = await CartsModel.findById(cid);
        console.log(cartid);
        res.send(cartid);
    } else {
        res.json({
            error: "id was not specified"
        });
    }
});
routerCart.post("/", async (req, res) => {
    const {
        products
    } = req.body;
    try {
        const newcart = await new CartsModel({
            products: products,
        }).save();
        res.send("se ha creado el carrito");
    } catch (error) {
        console.log(error);
    }
    //   await carts.addCart().then((result) => res.json(result));
});
routerCart.post("/:cid/product/:pid", async (req, res) => {
    const {
        cid,
        pid
    } = req.params;
    const {
        quantity
    } = req.body;
    //   await carts.addProductCart(cid, pid).then((result) => res.json(result));
    const cartid = await CartsModel.findById(cid);
    try {
        for (let i = 0; i < cartid.products.length; i++) {
            console.log(i);
            if (cartid.products[i].idproducto == pid) {
                cartid.products[i].quantity = cartid.products[i].quantity + quantity;
                console.log("cartid", cartid.products[i].quantity);
                cartid.save();
                return res.send(cartid);
            }
        }
        cartid.products.push({
            idproducto: pid,
            quantity: quantity
        });
        cartid.save();
        res.send(cartid);
    } catch (error) {
        console.log(error);
    }

    console.log("cartaid", cartid);
});
module.exports = routerCart;