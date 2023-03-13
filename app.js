const ProductManager = require("./productManager");
const session = require("express-session");
const chatRouter = require("./src/router/msgRoutes");
const mongoose = require("mongoose");
const productos = new ProductManager("./src/db/productos.json");
const messagesList = [];
const bodyParser = require("body-parser");
const events = require("./socketEvents");
const {
    Server
} = require("socket.io");
const express = require("express");
const app = express();
const port = 8080;
const routerProducts = require("./src/router/products");
const routerCart = require("./src/router/carrito");
const authRouter = require("./src/router/auth");
const MongoStore = require("connect-mongo");

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.static("./src/public"));
app.use(express.json());
app.use("/api/products", routerProducts);
app.use("/api/carts", routerCart);
app.use("/api/messages", chatRouter);

const httpServer = app.listen(port, () =>
    console.log("Server running on port 8080")
);
/* websocket config */
const {
    Server: SocketServer
} = require("socket.io");
const {
    Server: HttpServer
} = require("http");
// const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
/* handlebars config */
const handlebars = require("express-handlebars");
//chat

const io = new Server(httpServer);
io.on("connection", (socket) => {
    console.log("Nuevo cliente");
    socket.emit("messages", messagesList);

    socket.on("newUserLoged", (user) => {
        io.sockets.emit("newUser", user);
    });

    socket.on("message", (data) => {
        messagesList.push(data);
        io.sockets.emit("messages", messagesList);
    });
});
const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/src/public/viewsHandlebars/layouts",
    partialsDir: __dirname + "/src/public/viewsHandlebars/partials",
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "./src/public/viewsHandlebars");

app.get("/realtimeproducts", (req, res) => {
    res.render("realtimeProducts");
});
app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/register", (req, res) => {
    res.render("register");
});

socketServer.on("connection", (socket) => {
    socketServer.sockets.emit(events.INIT, productos.products);
    socketServer.sockets.emit(events.UPDATE_PRODUCT, productos.products);
    socket.on(events.POST_PRODUCT, (product) => {
        productos.addProduct(product);
        console.log("producto posteado");
        socketServer.sockets.emit(events.UPDATE_PRODUCT, productos.products);
    });
});

// Cookies:
const mongoStore = MongoStore.create({
    mongoUrl: "mongodb+srv://gonzalobruno997:1234@cluster0.zjno9zw.mongodb.net/Ecommerce?retryWrites=true&w=majority",
    mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    ttl: 150,
});

app.use(
    session({
        store: mongoStore,
        secret: "esteeselsecret",
        resave: false,
        saveUninitialized: false,
    })
);

//SESSION DATA:

app.use("/auth", authRouter);

app.get("/", (req, res) => {
    req.session.user ?
        res.render("home", {
            userName: req.session.user.name,
            role: req.session.user.role,
        }) :
        res.render("home", {});
});

app.on("ERROR", (error) => console.log("error " + error));