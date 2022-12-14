'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        },
        role: {
            type: DataTypes.ENUM('admin', 'user')
        },
        capabilities: {
            type: DataTypes.VIRTUAL,
            get : function(){
                const acl = {
                    user: ['read', 'create'],
                    admin: ['read', 'update', 'delete', 'create']
                }
                return acl[this.role];
            }
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
            throw new Error();
        }
    }

    User.validateToken = async function(token) {
        let parsedToken = jwt.verify(token, process.env.SECRET_KEY);
        try {
            let user = await this.findOne({where: { userName: parsedToken.userName}});
            if(user){
                return user;
            }else {
                throw new Error();
            }
        } catch (error) {
            throw new Error();  
        }
    }


    return User;
}



module.exports = userModel;