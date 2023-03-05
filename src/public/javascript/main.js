const contenedor = document.getElementById("contenedorProductos");
const contenedorUpdateProducts = document.getElementById("updateProducts");

const socket = io();
let user;
let chatBox = document.getElementById("chatBox");

// console.log("messages", messages);

//
Swal.fire({
        title: "Identificate",
        input: "text",
        text: "Ingresa un nombre",
        inputValidator: (value) => {
            return !value && "Se necesita un nombre!";
        },
        allowOutsideClick: false,
    })
    .then((result) => {
        user = result.value;
        return user;
    })
    .then((user) =>
        socket.emit("newUserLoged", {
            user,
        })
    );
///;
chatBox.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", {
                user: user,
                message: chatBox.value,
            });
            fetch("http://localhost:8080/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat: chatBox.value,
                    name: user,
                }),
            });
            chatBox.value = "";
        }
    }
});

socket.on("messages", (data) => {
    let log = document.getElementById("messageLogs");
    let messages = "";
    data.forEach((msg) => {
        messages = messages + `${msg.user} dice: ${msg.message}</br>`;
    });
    log.innerHTML = messages;
});

socket.on("newUser", (user) => {
    Swal.fire({
        text: `${user.user} se conectó`,
        toast: true,
        position: "top-right",
    });
});

function obtenerProductos(pagina = 1) {
    fetch(`http://localhost:8080/api/products?page=${pagina}`)
        .then((res) => res.json())
        .then((data) => {
            // Aquí puedes trabajar con la respuesta de la petición
            // console.log(data);
            const products = data.products;
            const totalPages = data.totalPages;
            const currentPage = data.page;
            const prevPage = data.prevPage;
            const nextPage = data.nextPage;

            // Aquí puedes utilizar Handlebars para renderizar los productos
            fetch("http://localhost:8080/viewsHandlebars/listProducts.hbs")
                .then((res) => res.text())
                .then((text) => {
                    const template = Handlebars.compile(text);
                    const html = template({
                        products: products,
                    });
                    contenedor.innerHTML = html;
                    //creamos los botones dinamicamente

                    const botonesPaginacion = document.createElement("div");
                    botonesPaginacion.classList.add("pagination");
                    // Botón "Anterior"
                    if (prevPage) {
                        const botonAnterior = document.createElement("button");
                        botonAnterior.innerText = "Anterior";
                        botonAnterior.addEventListener("click", () => {
                            obtenerProductos(prevPage);
                        });
                        botonesPaginacion.appendChild(botonAnterior);
                    }
                    for (let i = 1; i <= totalPages; i++) {
                        const botonPagina = document.createElement("button");
                        botonPagina.innerText = i;
                        botonPagina.addEventListener("click", () => {
                            obtenerProductos(i);
                        });
                        if (i === currentPage) {
                            botonPagina.classList.add("active");
                        }
                        botonesPaginacion.appendChild(botonPagina);
                    }

                    // Botón "Siguiente"
                    if (nextPage) {
                        const botonSiguiente = document.createElement("button");
                        botonSiguiente.innerText = "Siguiente";
                        botonSiguiente.addEventListener("click", () => {
                            obtenerProductos(nextPage);
                        });
                        botonesPaginacion.appendChild(botonSiguiente);
                    }

                    // Añadimos los botones al contenedor de productos
                    contenedor.appendChild(botonesPaginacion);
                });
        });
}
obtenerProductos();
const formularioDeProductos = document.getElementById("formProducts");
const {
    title,
    price,
    stock,
    code,
    thumbnail,
    description
} =
formularioDeProductos;
formularioDeProductos.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: title.value,
            price: price.value,
            stock: stock.value,
            code: code.value,
            thumbnail: thumbnail.value,
            description: description.value,
        }),
    });
    window.location.reload();
});

const verCarritoBtn = document.getElementById("verCarrito");
verCarritoBtn.addEventListener("click", () => {
    const carritoId = document.getElementById("carritoId").value;
    CarritoData(carritoId);
});

function CarritoData(carritoid) {
    console.log("carritoid", carritoid);
    fetch(`http://localhost:8080/api/carts/${carritoid}`)
        .then((response) => response.json())
        .then((data) => {
            // aquí puedes hacer algo con los datos recibidos, como mapearlos a una lista de productos
            const productList = data.products.map((product) => ({
                name: product.idproducto.title,
                price: product.idproducto.price,
                quantity: product.quantity,
            }));
            console.log("productList", productList);
            // aquí puedes hacer algo con la lista de productos, como mostrarlos en una tabla o en el div con ID "carrito"
            const cartElement = document.getElementById("carrito");
            cartElement.innerHTML = ""; // limpia el contenido previo del div
            /* cartElement.textContent = "Ver Carrito"; */
            productList.forEach((product) => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");

                const nameElement = document.createElement("span");
                nameElement.innerText = product.name;
                productElement.appendChild(nameElement);

                const priceElement = document.createElement("span");
                priceElement.innerText = product.price;
                productElement.appendChild(priceElement);

                const quantityElement = document.createElement("span");
                quantityElement.innerText = product.quantity;
                productElement.appendChild(quantityElement);

                cartElement.appendChild(productElement);
            });
        })
        .catch((error) => console.error(error));
}