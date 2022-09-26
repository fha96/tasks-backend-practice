'use strict';

const bcrypt = require('bcrypt');
const e = require('express');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/status.route');

const userModel = (suquelize, DataTypes) => {


    const User = suquelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
            isEmail:true
        },
        userName:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        token: {
            type: DataTypes.VIRTUAL
        }
    });

    User.authenticateBasic = async function(userName, password) {
        try {
            const user = await this.findOne({where:{userName}});
            if(user){
                let validate = await bcrypt.compare(password, user.password);
                console.log(validate);
                if(validate) {
                    let token = jwt.sign({userName:userName},process.env.SECRET_KEY);
                    user.token = token;
                    return user;
                } else {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        } catch(error) {
            return error.message;
        }
    }




    return User;
}



module.exports = userModel;