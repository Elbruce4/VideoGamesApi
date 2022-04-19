const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("postComment" , {
       title : {
           type: DataTypes.STRING
       },
       text : {
           type: DataTypes.TEXT
       }

    })
}