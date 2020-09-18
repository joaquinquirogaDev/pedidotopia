const server = require("express").Router();
const request = require("request-promise");
const { Product, Image, Variant } = require("../db.js");

//Shopify
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
    // Traigo todos los productos de Shopify
    const get = await request(options);

    //Busco o creo las imagenes
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

    //Busco o creo sus variants (precio, stock, sku)
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

    //Busco o creo los productos
    const products = get.products.map((product) => {
      return Product.findOrCreate({
        where: {
          title: product.title,
          vendor: product.vendor,
          product_id_shopify: product.id,
        },
      });
    });

    //Resuelvo las promesas anteriores
    const imagenes = Promise.all(images);
    const variantes = Promise.all(variants);
    const productos2 = Promise.all(products);

    //imagenes, variantes y productos2 siguen siendo promesas
    Promise.all([productos2, imagenes, variantes])
      .then((values) => {
        productos = values[0];
        const imagenes = values[1];
        const variantes = values[2];
        //a cada producto le asigno un variant segun su id
        for (let i = 0; i < productos.length; i++) {
          productos[i][0].addVariants(variantes[i][0].dataValues.id);
        }

        //Creo un arreglo con imagenes(hay productos que no tienen imagenes)
        const imagenes2 = [];
        for (let i = 0; i < imagenes.length; i++) {
          if (imagenes[i].length > 0) {
            imagenes2.push(imagenes[i]);
          }
        }

        //Resulevo imagenes 2 y las guardo en un array de promesas
        const promiseImages = [];
        for (let i = 0; i < imagenes2.length; i++) {
          promiseImages.push(Promise.all(imagenes2[i]));
        }

        //Resuelvo promiseImages
        return Promise.all(promiseImages);
      })
      .then((image) => {
        var imageId = [];
        var productId = [];

        //image es un array de imagenes, guardo su id y el productID
        for (let i = 0; i < image.length; i++) {
          for (let j = 0; j < image[i].length; j++) {
            // console.log(image[i][j][0].dataValues.id);
            imageId.push(image[i][j][0].dataValues.id);
            productId.push(image[i][j][0].dataValues.product_id_shopify);
          }
        }

        //Recorro los productos y el productId para comparar que coincidan los ID
        //Luego le agrego esas imagenes al producto correspondiente
        for (let i = 0; i < productos.length; i++) {
          for (let j = 0; j < productId.length; j++) {
            if (
              productos[i][0].dataValues.product_id_shopify === productId[j]
            ) {
              productos[i][0].addImages(imageId[j]);
            }
          }
        }
      })
      //Busco todos los productos, incluidos Variants e Imagenes en la BD
      .then((a) => {
        return Product.findAll({ include: [Variant, Image] });
      })
      //Envio los productos encontrados
      .then((products) => {
        res.status(200).send(products);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = server;
