'use strict';


const express = require('express');
const {Task, Models} = require('../models/index');
const router = express.Router();

 router.get('/task', getAll);

 router.post('/task', addTask);



 async function addTask(req, res) {
    let data = req.body;
    let task = await Task.add(data);
    res.status(201).send(task);
 }


 async function getAll (req, res) {
    let tasks = await Task.readTasksWithStatus(Models.statusModel);
    res.status(200).send(tasks);
 }






module.exports = router;