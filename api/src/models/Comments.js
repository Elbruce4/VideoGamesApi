const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("comment" , {
       title : {
           type: DataTypes.STRING
       },
       text : {
           type: DataTypes.TEXT
       }

    })
}