class ProductManager {
    constructor (){
        this.products = []
        this.acumulador = 1

    }
    getProducts = () => this.products
    getProductById = (id) => {
        if(this.products.some((product) => product.id === id)){
            return this.products.find((product) => product.id === id)
        }else{
            console.log("Not found")
        }
        
    } 
    addProduct = (producto) => {
        if(this.checkProduct(producto)){
            if(!this.isInProducts(producto)){
                this.products.push({...producto, id: this.acumulador++})
            }else{
                console.log("ERROR: el producto ya existe dentro del sistema")
            }
        }else{
            console.log("ERROR: el producto no cuenta con todas las propiedades solicitadas o cuenta con mas propiedades de las solicitadas")
        }
    }
    isInProducts = (productToCheck) => this.products.some((product) => product.code === productToCheck.code )
    checkProduct = (producto) => {
        const properties = ["title", "description", "price", "thumbnail", "code", "stock"]
        const results = []
        let acumulador = 0
        for(let propiedad in producto){
            results.push(propiedad == properties[acumulador])
            acumulador++

        }
        return results.every((result) => result)
    }
}
class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }

}
const productos = new ProductManager ()
console.log(productos.getProducts())
productos.addProduct(new Product("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25))
productos.addProduct(new Product("producto prueba", "este es un producto prueba", 200, "sin imagen", "abc123", 25))
console.log(productos.getProducts())
console.log(productos.getProductById(24))
