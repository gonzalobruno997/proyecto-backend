const contenedor = document.getElementById("contenedorProductos")
const contenedorUpdateProducts = document.getElementById("updateProducts")
const socket = io()
socket.on("connect", () => {
    console.log("alguien esta conectado al servidor")
})
socket.on("INIT", (products) => {
    fetch("http://localhost:8080/viewsHandlebars/listProducts.hbs").then((res) => res.text()).then((text) => {
        const template = Handlebars.compile(text)
        const html = template({products:products})
        contenedor.innerHTML = html
    })
})
const formularioDeProductos = document.getElementById("formProducts")
formularioDeProductos.addEventListener("submit", (e) => {
    
    const {title, price, stock, code, thumbnail, description} = formularioDeProductos
    socket.emit("POST_PRODUCT", ({title:title.value, price:price.value, stock:stock.value, code:code.value, thumbnail:thumbnail.value, description:description.value }))
})