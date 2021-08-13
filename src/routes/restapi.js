const express = require('express');
const mongoose = require('mongoose');
const Users = mongoose.model("to_do_users");

const Router = express.Router();
const List = require('../models/todo');
const bearerAuth = require('../middleware/auth/bearer');
Router.get('/',async (req,res,next)=>{
  res.status(200).send("hello world");
})
Router.post('/todo',bearerAuth, async (req, res, next) => {
    try {
        const { task, description, creationdate,  duedate } = req.body
        const id = req.user._id
      let toDo = new List({ 
        task,
        description,
        creationdate,
        duedate,
        userId:id,
        dateAdded: Date.now(),
        dateModified: Date.now(),
        });
      const toDoRecord = await toDo.save();
      const output = {
        toDo: toDoRecord
      };
      res.status(200).json(output);
    } catch (e) {
      next(e.message)
    }
 });

Router.get('/todo',bearerAuth, async (req, res, next) => {
    try {
      let toDo =  await (await List.find({}).populate('to_do_users').where({ userId: req.user._id }))
    
      const output = {
        toDo,
      };
      res.status(200).json(output);
    } catch (e) {
      next(e.message)
    }
 });

 module.exports = Router;