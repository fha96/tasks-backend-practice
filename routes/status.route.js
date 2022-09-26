'use strict';


const express = require('express');
const {Status, Models} = require('../models/index');
const router = express.Router();



// get all status
router.get('/status', getAll);

router.post('/status/:taskID/:userID', addStatus);

router.delete('/status/:id', handleDelete);


async function addStatus(req, res) {
    let {taskID, userID} = req.params;
    let data = req.body;
    data.taskID = taskID;
    data.userID = userID;
    let user = await Models.userModel.findOne({where:{id:userID}});
    data.name = user.userName;
    console.log(data);
    let status = await Status.createAndReadAllStatus(Models.taskModel, data, taskID);
    res.status(201).send(status);
}

async function handleDelete (req, res) {
    let {id} = req.params;
   
        await Status.delete(id)
        .then(resolove =>res.status(200).send('Status has been deleted successfully') )
        .catch(rejected => res.status(500).send(rejected));    

}

async function getAll(req, res) {
    let status = await Status.read();
    res.status(200).send(status);
}



module.exports = router;