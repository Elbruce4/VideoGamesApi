const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("user" , {
       name : {
           type: DataTypes.STRING
       },
       lastName: {
           type: DataTypes.STRING
       },
       password : {
            type: DataTypes.STRING
       },
       favs : {
           type : DataTypes.ARRAY(DataTypes.TEXT) 
       },
       text : {
           type: DataTypes.TEXT
       },
      /*  comments : {
           type: DataTypes.ARRAY(DataTypes.JSON)
       },
       posts : {
        type: DataTypes.ARRAY(DataTypes.JSON)
        } */
    });
}