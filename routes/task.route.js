'use strict';


const express = require('express');
const bearerAuth = require('../middlewares/bearerAuth');
const {Task, Models} = require('../models/index');
const router = express.Router();

 router.get('/task', bearerAuth(Models.userModel), getAll);

 router.post('/task',bearerAuth(Models.userModel) ,addTask);



 async function addTask(req, res) {
    let data = req.body;
   await Task.add(data);
    res.status(201).send('task has been added succesfully');
 }


 async function getAll (req, res) {
    let tasks = await Task.readTasksWithStatus(Models.statusModel);
    res.status(200).send(tasks);
 }






module.exports = router;