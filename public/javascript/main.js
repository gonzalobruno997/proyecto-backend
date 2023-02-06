
const contenedor = document.getElementById("contenedorProductos")
const contenedorUpdateProducts = document.getElementById("updateProducts")

fetch("http://localhost:8080/api/products").then(res => res.json()).then( products => {
    console.log(products)
    fetch("http://localhost:8080/viewsHandlebars/listProducts.hbs").then((res) => res.text()).then((text) => {
        console.log(text)
    const template = Handlebars.compile(text)
    const html = template({products:products})
    contenedor.innerHTML = html
})
})

const formularioDeProductos = document.getElementById("formProducts")
const {title, price, stock, code, thumbnail, description} = formularioDeProductos
formularioDeProductos.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch("http://localhost:8080/api/products", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify({title:title.value, price:price.value, stock:stock.value, code:code.value, thumbnail:thumbnail.value, description:description.value })
    })
    window.location.reload()
})
