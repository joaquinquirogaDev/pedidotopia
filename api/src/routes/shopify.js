require("dotenv").config();
const server = require("express").Router();
const url = require("url");
const { Variant, Product, Image } = require("../db.js");
var request = require("request-promise");
const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_APP_ID,
  SHOPIFY_API_PASSWORD,
  APP_DOMAIN,
} = process.env;

const testUrl = `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${APP_DOMAIN}/admin/api/2020-07/`;

server.get("/products", (req, res, next) => {
  let options = {
    method: "GET",
    uri: testUrl + "products.json",
    json: true,
  };
  request(options).then((response) => {
    res.status(200).json(response.products);
  });
});

server.post("/products", async (req, res, next) => {
  try {
    let product = req.body;

    let options = {
      method: "POST",
      uri: testUrl + "products.json",
      body: product,
      json: true,
    };

    const post = await request(options);

    const prod = await Product.create({
      title: post.product.title,
      description: post.product.body_html,
      product_id: post.product.id,
    });
    await Variant.create({
      productId: prod.id,
      product_id: post.product.id,
      variant_id: post.product.variants[0].id,
      title: post.product.variants[0].title,
      price: post.product.variants[0].price,
      inventory_quantity: post.product.variants[0].inventory_quantity,
    });

    const images = post.product.images.map((img) =>
      Image.create({
        productId: prod.id,
        image_id: img.id,
        product_id: img.product_id,
        position: img.position,
        src: img.src,
      })
    );

    await Promise.all(images);

    Product.findOne({
      where: { id: prod.id },
      include: [Variant, Image],
    }).then((product) => res.send(product));
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = server;
