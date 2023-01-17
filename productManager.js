const fs = require ("fs")
const saveArchive = async(rute, content) => {
    try{
        await fs.promises.writeFile (rute, JSON.stringify(content))
        console.log("exito")
    }catch(error){
        console.log(error)
    }

}
const readArchive = async (rute) =>{
    try{
        return fs.promises.readFile(rute, "utf-8")
    }catch(error){
        console.log(error)
    }
}

class ProductManager {
    constructor (path){
        this.path = path
        this.products = []
        this.acumulador = 1

    }
    getProducts = () => readArchive(this.path).then((data) => JSON.parse(data) )
    getProductById = (id) => {
        if(this.products.some((product) => product.id === id)){
            return this.products.find((product) => product.id === id)
        }else{
            return({type:404, content:`el producto con el id ${id} no existe.`})
        }
        
    }
    updateProduct = async (id, propertyToUpdate, valueToUpdate)  => {
        if(propertyToUpdate === "id"){
            console.log("ERROR el id no es propiedad valida para modificar")
        }else{
            const indice = this.products.findIndex((product) => product.id === id)
            this.products[indice][propertyToUpdate] = valueToUpdate
        }
        await saveArchive(this.path, this.products)
        
    }
    deleteProduct = async (id) => {
        if(this.products.some((product)=> product.id === id)){
            this.products = this.products.filter((product) => product.id !== id )
            console.log(this.products)
        }else{
            console.log("el producto no existe")
        }
        await saveArchive (this.path, this.products)

    }
    addProduct = async (producto) => {
        
        const properties = ["title", "description", "price", "thumbnail", "code", "stock"]
        const results = []
        let acumulador = 0
        for(let propiedad in producto){
            results.push(propiedad == properties[acumulador])
            acumulador++

        }
        
        if(results.every((result) => result)){
            if(!this.products.some((product) => product.code === producto.code )){
                this.products.push({...producto, id: this.acumulador++})
            }else{
                console.log("ERROR: el producto ya existe dentro del sistema")
            }
        }else{
            console.log("ERROR: el producto no cuenta con todas las propiedades solicitadas o cuenta con mas propiedades de las solicitadas")
        }
        await saveArchive (this.path, this.products)
        
    }
}
/*
const productos = new ProductManager ("./db/productos.txt")
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j124", stock:500})
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j125", stock:500})
productos.deleteProduct(2)
productos.addProduct({title:"lorem", description: "lorem ipsum", price:5000, thumbnail: "url", code: "j126", stock:500})


productos.updateProduct(3,"color", "azul")
productos.getProducts()*/

module.exports = ProductManager