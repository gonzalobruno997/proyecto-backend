const { response, json } = require("express")
const {saveArchive, readArchive} = require("./fileSystemManager")
class CartManager{
    static counterCart = 0
    constructor(path){
        this.carts = []
        this.path = path
    }
    getCartById = async (id) => {
        
            return await readArchive(this.path).then((data) => JSON.parse(data) ).then((result) =>{
                const cart = result.find((cart) => Number(cart.id) === Number(id) )
                if(cart === -1 || cart === undefined){
                    return {"error" : "there is no cart that matches the selected id" } 
                }else{
                    return cart
                }
            })
        
        
    } 
    addCart = async () => {
        this.carts.push({products:[], id:CartManager.counterCart++})
        await saveArchive(this.path, this.carts)
        return await readArchive(this.path).then((result) => JSON.parse(result))
    }
    addProductCart = async (cid, pid) => {
        return await readArchive(this.path)
        .then((data) => JSON.parse(data))
        .then( async result  => {
            if(!result.some((cart) => Number(cart.id) === Number(cid) )){
                return {"error" : "there is no cart that matches the selected id" }
            }else{
                const index = result.findIndex((cart) => Number(cart.id) === Number(cid)) 
                if(result[index].products.some((product) => Number (product.id) === Number (pid))){
                    
                    result[index].products.forEach(product => {
                        if(Number (product.id) === Number (pid)){
                            product.quantity++
                        }
                    })
                }else{
                    result[index].products.push({id:pid, quantity:1})
                }
                await saveArchive(this.path, result)
                return await readArchive(this.path).then(data => JSON.parse(data))
                
            }
        })
        
    } 


}
module.exports = CartManager