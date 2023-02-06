const ProductManager = require("./productManager")
const productos = new ProductManager ("./db/productos.json")
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
const bodyParser = require("body-parser")
const events = require("./socketEvents")
/*const productos = require("./router/products") */
const express = require("express")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(express.json())
const port = 8080
/* const routerProducts = require("./router/products")
const routerCart = require("./router/carrito")
app.set("/api/products", routerProducts)
app.set("/api/carts", routerCart) */
/* websocket config */
const {Server: SocketServer} = require("socket.io")
const {Server: HttpServer} = require("http")
const httpServer = new HttpServer(app)
const socketServer = new SocketServer(httpServer) 
/* handlebars config */
const handlebars = require("express-handlebars")

const hbs = handlebars.create({
    extname: ".hbs", 
    defaultLayout:"index.hbs",
    layoutsDir:__dirname + "/public/viewsHandlebars/layouts",
    partialsDir:__dirname + "/public/viewsHandlebars/partials"
})
app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "./public/viewsHandlebars")
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/realtimeproducts", (req , res) => {
    res.render("realtimeProducts")
}) 
socketServer.on("connection", (socket) => {
    socketServer.sockets.emit(events.INIT, productos.products)
    socketServer.sockets.emit(events.UPDATE_PRODUCT, productos.products)
    socket.on(events.POST_PRODUCT, (product)=>{
        productos.addProduct(product)
        console.log("producto posteado")
        socketServer.sockets.emit(events.UPDATE_PRODUCT, productos.products)
    })
})
// app.listen(port, () => console.log(`el servidor se abrio en el puerto ${port} `))
httpServer.listen(port, () => console.log("el servidor se esta escuchando en el puerto " + port))



app.on("ERROR",(error) => console.log("error " + error))

app.get("/api/products", async (req, res) => {
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
    
})
app.post("/api/products", async (req, res) => {
    const {title, stock, price, code, thumbnail, description} = req.body
    productos.addProduct({title, stock, price, code, thumbnail, description})
    await productos.getProducts().then(productos => res.json(productos))
})
