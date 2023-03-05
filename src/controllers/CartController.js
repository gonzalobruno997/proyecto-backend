const express = require("express");
const cartservices = require("../services/cartServices");
const getcarritoAll = async (req, res) => {
    try {
        const cartid = await cartservices.getcartsAll();

        res.send(cartid);
    } catch (error) {
        res.send(`${error.message}`);
    }
};

const getcarrito = async (req, res) => {
    try {
        const cartid = await cartservices.getcarts(req.params.cid);

        res.send(cartid);
    } catch (error) {
        res.send(`${error.message}`);
    }
};

const postcarrito = async (req, res) => {
    try {
        const {
            products
        } = req.body;
        const newcart = await cartservices.postcarrito(products);

        res.send(newcart);
    } catch (error) {
        console.log(error);
    }
};
const postcarritoid = async (req, res) => {
    try {
        const {
            cid,
            pid
        } = req.params;
        const {
            quantity
        } = req.body;
        const cartid = await cartservices.postcarritoid(cid, pid, quantity);
        res.send(cartid);
    } catch (error) {
        console.log(error);
    }
};

const editcarrito = async (req, res) => {
    try {
        const {
            products
        } = req.body;
        const {
            cid
        } = req.params;
        const cartid = await cartservices.editcarrito(products, cid);

        res.send(cartid);
    } catch (error) {
        res.send(`${error.message}`);
    }
};
const editcarritoid = async (req, res) => {
    try {
        const {
            cid,
            pid
        } = req.params;
        const {
            quantity
        } = req.body;
        const cartid = await cartservices.editcarritoid(cid, pid, quantity);
        res.send(cartid);
    } catch (error) {
        console.log(error);
    }
};

const deletecarrito = async (req, res) => {
    try {
        const {
            cid
        } = req.params;
        await cartservices.deletecartById(cid);
        res.send("se elimino");
    } catch (error) {
        console.log(error);
    }
};

const deleteProductInCarrito = async (req, res) => {
    try {
        const {
            cid,
            pid
        } = req.params;
        const cartid = await cartservices.deleteProductInCarrito(cid, pid);
        res.send("se borro el producto");
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getcarrito,
    postcarrito,
    postcarritoid,
    getcarritoAll,
    editcarrito,
    editcarritoid,
    deletecarrito,
    deleteProductInCarrito,
};