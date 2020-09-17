const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("variant", {
    product_id_shopify: {
      type: DataTypes.BIGINT,
    },
    // variant_id: {
    //   type: DataTypes.BIGINT,
    // },
    title: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.STRING,
    },
    inventory_quantity: {
      type: DataTypes.INTEGER,
    },
    sku: {
      type: DataTypes.STRING,
    },
  });
};
