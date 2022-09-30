"use strict";

const express = require("express");
const bearerAuth = require("../middlewares/bearerAuth");
const capabilities = require("../middlewares/capabilities");
const { Task, Models } = require("../models/index");
const router = express.Router();

router.get("/task", bearerAuth(Models.userModel), capabilities("read"), getAll);

router.post(
  "/task",
  bearerAuth(Models.userModel),
  capabilities("create"),
  addTask
);

router.delete(
  "/task/:id",
  bearerAuth(Models.userModel),
  capabilities("delete"),
  deleteTask
);

router.put(
  "/task/:id",
  bearerAuth(Models.userModel),
  capabilities("update"),
  updateTask
);

async function addTask(req, res) {
  let data = req.body;
  await Task.add(data);
  res.status(201).send("task has been added succesfully");
}

async function getAll(req, res) {
  let tasks = await Task.readTasksWithStatus(Models.statusModel);
  res.status(200).send(tasks);
}

async function deleteTask(req, res) {
  let { id } = req.params;
  await Task.delete(id);
  res.status(200).send("Task has been deleted successfully");
}

async function updateTask(req, res) {
  let { id } = req.params;
  let data = req.body;
  await Task.update(data, id);
  res.status(200).send("Updated Successfully");
}

module.exports = router;
