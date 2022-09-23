'use strict';

const bcrypt = require('bcrypt');


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
        }
    });

    User.authenticateBasic = async function(userName, password) {
        try {
            const user = await this.findOne({where:{userName}});
            if(user){
                let validate = await bcrypt.compare(password, user.password);
                console.log(validate);
                if(validate) {
                    return user;
                } else {
                    throw new Error();
                }
            } else {
                throw new Error();
            }
        } catch(error) {
            throw new Error('Invalid Login');
        }
    }


    return User;
}



module.exports = userModel;