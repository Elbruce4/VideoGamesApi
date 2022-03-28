const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {

    id : {
      type: DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.STRING(1234) ,
      allowNull: false 
    },
    date: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.INTEGER
    },
    platforms: {
      type : DataTypes.ARRAY(DataTypes.STRING) 
    },
    
    
  });
};
