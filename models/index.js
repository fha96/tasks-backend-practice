'use strict';


const {Sequelize, DataTypes} = require('sequelize');
const user = require('./user.model');
const task = require('./tasks.model');
const status = require('./status.model');
const Collections = require('../collections/model.methods');

// Data base url
let DATABASE_URL = process.env.DATABASE_URL || 'postgres://fahadzidan1@localhost:5432/madness' ; 


let sequelizeOption = {
    dialectOptions : {
        ssl : {
            require : true,
            rejectUnauthorized: false
        }
    }


};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOption);

const userModel = user(sequelize, DataTypes);
const taskModel = task(sequelize, DataTypes);
const statusModel = status(sequelize, DataTypes);

const User = new Collections(userModel);
const Task = new Collections(taskModel);
const Status = new Collections(statusModel);


taskModel.hasMany(statusModel, {foreignKey:'taskID', sourceKey:'id'});
statusModel.belongsTo(taskModel, {foreignKey:'taskID', targetKey:'id'});
userModel.hasMany(statusModel, {foreignKey:'userID', sourceKey:'id'});
statusModel.belongsTo(userModel, {foreignKey: 'userID', targetKey: 'id'});

module.exports = {
    sequelize,
    User,
    Task,
    Status,
    Models:{
        userModel,
        taskModel,
        statusModel
    }
}


