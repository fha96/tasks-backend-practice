'use strict';




module.exports = (sequelize, DataTypes) => sequelize.define('status', {
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    taskID: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});