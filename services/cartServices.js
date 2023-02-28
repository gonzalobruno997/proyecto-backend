const express = require("express");
const CartsModel = require("../models/cartsmodel");

const getcartsAll = async () => {

        const carts = await CartsModel.find();
        return carts;
};
const getcarts = async (cid) => {
    console.log("cid2", cid);
    if (cid) {
        const cartid = await CartsModel.findById(cid);
        return cartid;
    } else {
        throw new Error("id was not specified");
    }
};
const postcarrito = async (products) => {
    try {
        const newcart = await new CartsModel({
            products: products,
        }).save();
        return newcart;
    } catch (error) {
        console.log(error);
    }
};

const postcarritoid = async (cid, pid, quantity) => {
    const cartid = await CartsModel.findById(cid);
    console.log("cid", cid, "pid", pid, "quantuty", quantity);
    try {
        for (let i = 0; i < cartid.products.length; i++) {
            console.log(i);
            if (cartid.products[i].idproducto == pid) {
                cartid.products[i].quantity = cartid.products[i].quantity + quantity;
                console.log("cartid", cartid.products[i].quantity);
                cartid.save();
                return cartid;
            }
        }
        cartid.products.push({
            idproducto: pid,
            quantity: quantity
        });
        cartid.save();
        return cartid;
    } catch (error) {
        console.log(error);
    }
};

const deletecartById = async (pid) => {
    try {
        await CartsModel.deleteOne({
            _id: pid
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteProductInCarrito = async (cid, pid) => {
    const cartid = await CartsModel.findById(cid);
    console.log("cid", cid, "pid", pid);
    try {
        for (let i = 0; i < cartid.products.length; i++) {
            console.log(i);
            if (cartid.products[i].idproducto == pid) {
                delete cartid.products[i]
                cartid.save();
                return cartid;
            }
        }
        return "no se encontró";
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getcarts,
    postcarrito,
    postcarritoid,
    getcartsAll,
    deletecartById,
    deleteProductInCarrito
};