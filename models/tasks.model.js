'use strict';


module.exports = (sequelize, DataTypes) => sequelize.define('task', {
    title:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    description:{
        type: DataTypes.STRING
    }
});