const routerProducts = require("express").Router()
const ProductManager = require("../productManager")
const productos = new ProductManager ("./db/productos.json")
const ProductModel = require("../models/productsmodel");
/* productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j124", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j125", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j126", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j127", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j128", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j129", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j123", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j122", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j121", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j120", stock:500}) */

/* routerProducts.get("/", async (req, res) => {
    console.log(req.query.limit)
    if(req.query.limit){
        await productos.getProducts().then((productos) => {
            const resultados = []
            for(let i = 0; i < req.query.limit; i++){
                resultados.push(productos[i])
            }
            res.json(resultados)
        })
    }else{
        await productos.getProducts().then((productos)=> res.json(productos))
    }
    
}) */
routerProducts.get("/", async (req, res) => {
    const products = await ProductModel.find();
    console.log("products", products);
    res.send(products);
    });

routerProducts.get("/:pid", async (req, res) =>{
    const productoid = ProductModel.find({
        id: req.params.id
    });

    res.send(productoid);
    /* res.json(productos.getProductById(Number(req.params.pid))) */
})
/* routerProducts.delete("/:pid", async (req, res) => {
    const {pid} = req.params
    if(isNaN(pid) || pid < 1){
        res.json({content:"ERROR: EL ID INGRESADO NO ES NUMERICO O ES MENOR A 1"})
    }else{
        productos.deleteProduct(Number(pid))
        await productos.getProducts().then(productos => res.json(productos))
    }
} ) */
routerProducts.delete("/:pid", async (req, res) => {
    const {pid} = req.params
    try {
        if(isNaN(pid) || pid < 1){
            return res.json({content:"ERROR: EL ID INGRESADO NO ES NUMERICO O ES MENOR A 1"})
        }
        console.log("reqparams", req.params.pid);
        const deleteproduct = await ProductModel.deleteOne({
            _id:pid
        });
        res.send("se elimino");
    } catch (error) {
        console.log(error);
    }
    });
routerProducts.post("/", async (req, res) => {
    const {
        title,
        stock,
        price,
        code,
        thumbnail,
        description
    } = req.body;
    //   productos.addProduct({ title, stock, price, code, thumbnail, description });
    //   await productos.getProducts().then((productos) => res.json(productos));
    try {
        const newproduct = await new ProductModel({
            title: title,
            stock: stock,
            price: price,
            code: code,
            thumbnail: thumbnail,
            description: description,
        }).save();

        console.log("msg", newproduct);
        const products = await ProductModel.find();
        console.log("products", products);
        res.send(products);
    } catch (error) {
        console.log(error);
    }
});
// await productos.getProducts().then(productos => res.json(productos))
/* routerProducts.put("/:pid", async (req, res) => {
    const {pid} = req.params
    const {title, price, stock, code, thumbnail, description, id} = req.body
    await productos.updateAllProduct(pid, {title, price, stock, code, thumbnail, description, id})
    .then(() => productos.getProducts()).then((products) => res.json(products))
}) */
routerProducts.put("/:pid", async (req, res) => {

    const pid = {
        _id: req.params.pid
    };
    const {
        title,
        price,
        stock,
        code,
        thumbnail,
        description,
        id
    } = req.body;

    let productupdate = await ProductModel.findOneAndUpdate(pid, req.body, {
        returnOriginal: false,
    });
    console.log("productupdate", productupdate);
    res.send("se modifico");
});
module.exports = routerProducts
/*module.exports = productos */