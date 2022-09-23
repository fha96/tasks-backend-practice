'use strict';


const express = require('express');
const {User, Models} = require('../models/index');
const bcrypt = require('bcrypt');
const router = express.Router();
const basicAuth = require('../middlewares/basicAuth');





// get all users route
router.get('/user',getAllUsers);

//add user (signup)
router.post('/signup',handleSignup);


// signin 
router.post('/signin',basicAuth(Models.userModel),handleSignin);




async function handleSignin(req, res) {
    res.send('hello');
}

async function handleSignup(req, res) {
    let obj = req.body;
    try {
        
        obj.password = await bcrypt.hash(obj.password, 6);
        let user = await User.add(obj);
        if(user){
            res.status(200).send('User has been created successfully');
        } else{
            throw new Error();
        }
    } catch (error) {
        res.status(409).send('User already exists');
    }

}

async function getAllUsers(req, res) {
    let allUsers = await User.read();
    res.status(200).send(allUsers);
}


module.exports = router;