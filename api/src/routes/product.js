const server = require("express").Router();
const { Product, Image, Variant } = require("../db.js");
var request = require("request-promise");
const { SHOPIFY_API_KEY, SHOPIFY_API_PASSWORD, APP_DOMAIN } = process.env;
const testUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

server.get("/", async (req, res, next) => {
  let options = {
    method: "GET",
    uri: testUrl + "products.json",
    json: true,
  };
  const get = await request(options);
  var promiseVariant;
  get.products.map((product) => {
    if (product.variants.length > 0) {
      product.variants.map((variant) => {
        promiseVariant = Variant.create({
          title: variant.title,
          price: variant.price,
          inventory_quantity: variant.inventory_quantity,
          sku: variant.sku,
        });
      });
    }
    var promiseProduct = Product.create({
      title: product.title,
      vendor: product.vendor,
      product_id_shopify: product.id,
      images_shopify: product.images,
    });
    Promise.all([promiseProduct, promiseVariant])
      .then((values) => {
        product = values[0];
        // console.log(values[1]);
        variantId = values[1].dataValues.id;
        return product.setVariants(variantId);
      })
      .then((pruduct) => {
        return Product.findAll({ include: [Variant] })
          .then((products) => {
            res.send(products);
          })
          .catch(next);
      });
  });
});

module.exports = server;
