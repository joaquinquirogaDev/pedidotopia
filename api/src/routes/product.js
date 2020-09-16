const server = require("express").Router();
const { Product, Image, Variant } = require("../db.js");

server.get("/", (req, res, next) => {
  Product.findAll({ include: [Image, Variant] })
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

module.exports = server;
