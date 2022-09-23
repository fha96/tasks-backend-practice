'use strict';


const {Sequelize, DataTypes} = require('sequelize');
const user = require('./user.model');
const Collections = require('../collections/model.methods');

// Data base url
let DATABASE_URL = process.env.DATABASE_URL || 'postgres://fahadzidan1@localhost:5432/madness' ; 


let sequelizeOption = {



};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOption);

const userModel = user(sequelize, DataTypes);


const User = new Collections(userModel);



module.exports = {
    sequelize,
    User,
    Models:{
        userModel
    }
}


