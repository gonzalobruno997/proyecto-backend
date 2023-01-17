const ProductManager = require("./productManager")
const express = require("express")
const app = express()
app.use(express.urlencoded({extended:true}))
const port = 8080
const productos = new ProductManager ("./db/productos.txt")
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j124", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j125", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j126", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j127", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j128", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j129", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j123", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j122", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j121", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j120", stock:500})
app.listen(port, () => console.log(`el servidor se abrio en el puerto ${port} `))


app.get("/products", (req, res) =>{
    console.log(req.query.limit)
    if(req.query.limit){
        productos.getProducts().then((productos) => {
            const resultados = []
            for(let i = 0; i < req.query.limit; i++){
                resultados.push(productos[i])
            }
            res.json(resultados)
        })
    }else{
        productos.getProducts().then((productos)=> res.json(productos))
    }
    
})

app.on("ERROR",(error) => console.log("error " + error))

app.get("/products/:pid", (req, res) =>{
    res.json(productos.getProductById(Number(req.params.pid)))
})

