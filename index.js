'use strict'; 


const server = require('./server');
const {sequelize} = require('./models/index');
require('dotenv').config();


const PORT = process.env.PORT || 8080;

sequelize.sync().then(() => {
    server.start(PORT);
}); 