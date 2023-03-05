routerProducts = require("express").Router();
const ProductManager = require("../../productManager");
const productos = new ProductManager("./db/productos.json");
const ProductModel = require("../models/productsmodel");
const ProductController = require("../controllers/ProductController");
const express = require("express");

routerProducts.get("/", ProductController.getproducts);

routerProducts.get("/:pid", ProductController.getproductById);
routerProducts.delete("/:pid", ProductController.deleteproductById);

routerProducts.post("/", ProductController.createproduct);
routerProducts.put("/:pid", ProductController.editproduct);
module.exports = routerProducts;