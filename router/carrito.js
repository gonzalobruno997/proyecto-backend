const routerCart = require("express").Router()
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
module.exports = routerCart