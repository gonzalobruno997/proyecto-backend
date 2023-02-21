const express = require("express");
const cartservices = require("../services/cartservices");
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
    const { products } = req.body;
    const newcart = await cartservices.postcarrito(products);

    res.send(newcart);
  } catch (error) {
    console.log(error);
  }
};
const postcarritoid = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cartid = await cartservices.postcarritoid(cid, pid, quantity);
    res.send(cartid);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getcarrito, postcarrito, postcarritoid };