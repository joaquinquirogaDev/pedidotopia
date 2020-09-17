const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("image", {
    // image_id: {
    //   type: DataTypes.BIGINT,
    // },
    product_id_shopify: {
      type: DataTypes.BIGINT,
    },
    position: {
      type: DataTypes.INTEGER,
    },
    src: {
      type: DataTypes.STRING,
    },
  });
};
