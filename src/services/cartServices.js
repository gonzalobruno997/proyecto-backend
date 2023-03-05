const express = require("express");
const CartsModel = require("../models/cartsmodel");
const Products = require("../models/productsmodel");

const getcartsAll = async () => {
    const carts = await CartsModel.find().populate({
        path: "products.idproducto",
        model: "Products",
    });
    return carts;
};
const getcarts = async (cid) => {
    console.log("cid2", cid);
    if (cid) {
        const cartid = await CartsModel.findById(cid).populate({
            path: "products.idproducto",
            model: "Products",
        });
        return cartid;
    } else {
        throw new Error("id was not specified");
    }
};
const postcarrito = async (products, idproducto) => {
    try {
        const newcart = await new CartsModel({
            products: products,
        }).save();

        for (const cartProduct of newcart.products) {
            await cartProduct.set("idproducto", cartProduct.idproducto);
        }
        await newcart.save();
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
            quantity: quantity,
        });
        cartid.save();
        return cartid;
    } catch (error) {
        console.log(error);
    }
};
const editcarrito = async (products, cid) => {
    console.log("products", products);
    try {
        let carritoupdate = await CartsModel.findOneAndUpdate(
            cid, {
                products
            }, {
                returnOriginal: false,
            }
        );
        for (const cartProduct of carritoupdate.products) {
            await cartProduct.set("idproducto", cartProduct.idproducto);
        }
        return carritoupdate;
    } catch (error) {
        console.log(error);
    }
};


const editcarritoid = async (cid, pid, quantity) => {
    try {
        const cartid = await CartsModel.findById(cid);

        for (let i = 0; i < cartid.products.length; i++) {
            if (cartid.products[i].idproducto == pid) {
                cartid.products[i].quantity = quantity;

                cartid.save();
                return cartid;
            } else {
                return "no se encontro el id";
            }
        }
    } catch (error) {
        console.log(error);
    }
};

const deletecartById = async (pid) => {
    try {
        await CartsModel.deleteOne({
            _id: pid,
        });
    } catch (error) {
        console.log(error);
    }
};

const deleteProductInCarrito = async (cid, pid) => {
    const cartid = await CartsModel.findById(cid);
    console.log("pid", pid);

    try {
        const updatedCart = await CartsModel.findOneAndUpdate({
            _id: cid
        }, {
            $pull: {
                products: {
                    idproducto: pid
                }
            }
        }, {
            new: true
        });

        return updatedCart;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getcarts,
    postcarrito,
    postcarritoid,
    getcartsAll,
    editcarrito,
    editcarritoid,
    deletecartById,
    deleteProductInCarrito,
};