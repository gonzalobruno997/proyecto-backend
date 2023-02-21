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
    .then((user) => socket.emit("newUserLoged", {
        user
    }));
///;
chatBox.addEventListener("keyup", (evt) => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", {
                user: user,
                message: chatBox.value
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
})
fetch("http://localhost:8080/api/products")
    .then((res) => res.json())
    .then((products) => {
        console.log(products);
        fetch("http://localhost:8080/viewsHandlebars/listProducts.hbs")
            .then((res) => res.text())
            .then((text) => {
                console.log(text);
                const template = Handlebars.compile(text);
                const html = template({
                    products: products
                });
                contenedor.innerHTML = html;
            });
    });

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
})