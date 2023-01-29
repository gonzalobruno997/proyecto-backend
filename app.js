
const express = require("express")
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const port = 8080
const routerProducts = require("./router/products")
const routerCart = require("./router/carrito")
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCart)

app.listen(port, () => console.log(`el servidor se abrio en el puerto ${port} `))




app.on("ERROR",(error) => console.log("error " + error))


