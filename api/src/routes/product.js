const server = require("express").Router();
var Promise = require("bluebird");
const { Product, Image, Variant } = require("../db.js");
var request = require("request-promise");
const { SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, APP_DOMAIN } = process.env;
const testUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

server.get("/", async (req, res, next) => {
  try {
    var productos;
    let options = {
      method: "GET",
      uri: testUrl + "products.json",
      json: true,
    };

    const get = await request(options);

    const images = get.products.map((product) => {
      return product.images.map((img) => {
        return Image.findOrCreate({
          where: {
            product_id_shopify: img.product_id,
            position: img.position,
            src: img.src,
          },
        });
      });
    });

    const variants = get.products.map((product) => {
      return Variant.findOrCreate({
        where: {
          product_id_shopify: product.variants[0].product_id,
          title: product.variants[0].title,
          price: product.variants[0].price,
          inventory_quantity: product.variants[0].inventory_quantity,
          sku: product.variants[0].sku,
        },
      });
    });

    const products = get.products.map((product) => {
      return Product.findOrCreate({
        where: {
          title: product.title,
          vendor: product.vendor,
          product_id_shopify: product.id,
        },
      });
    });
    const imagenes = Promise.all(images);
    const variantes = Promise.all(variants);
    const productos2 = Promise.all(products);

    Promise.all([productos2, imagenes, variantes])
      .then((values) => {
        productos = values[0];
        const variantes = values[2];
        for (let i = 0; i < productos.length; i++) {
          productos[i][0].addVariants(variantes[i][0].dataValues.id);
        }
        const imagenes = values[1];
        const imagenes2 = [];
        for (let i = 0; i < imagenes.length; i++) {
          if (imagenes[i].length > 0) {
            imagenes2.push(imagenes[i]);
          }
        }
        const promesas3 = [];
        for (let i = 0; i < imagenes2.length; i++) {
          promesas3.push(Promise.all(imagenes2[i]));
        }
        return Promise.all(promesas3);
      })
      .then((image) => {
        var imageId = [];
        var productId = [];
        for (let i = 0; i < image.length; i++) {
          for (let j = 0; j < image[i].length; j++) {
            // console.log(image[i][j][0].dataValues.id);
            imageId.push(image[i][j][0].dataValues.id);
            productId.push(image[i][j][0].dataValues.product_id_shopify);
          }
        }
        for (let i = 0; i < productos.length; i++) {
          for (let j = 0; j < productId.length; j++) {
            if (
              productos[i][0].dataValues.product_id_shopify === productId[j]
            ) {
              productos[i][0].setImages(imageId[j]);
            }
          }
        }
      })
      .then((a) => {
        return Product.findAll({ include: [Variant, Image] });
      })
      .then((products) => {
        res.status(200).send(products);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = server;
