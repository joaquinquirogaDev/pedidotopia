const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("product", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vendor: {
      type: DataTypes.STRING,
    },

    product_id_shopify: {
      type: DataTypes.BIGINT,
    },
    images_shopify: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  });
};
