const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("post" , {
       title : {
           type: DataTypes.STRING
       },
       text : {
           type: DataTypes.TEXT
       }
    });
}