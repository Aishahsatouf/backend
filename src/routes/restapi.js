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

 Router.get('/onetodo',bearerAuth, async (req, res, next) => {
   const id=req.body.id
  try {
    let toDo =  await (await List.find({}).populate('to_do_users').where({ userId: req.user._id ,_id:id }))
  
    const output = {
      toDo,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message)
  }
});

 Router.put('/complete',bearerAuth, async (req, res, next) => {
  try {
    const {id}=req.body
    let list=await List.findOne({_id:id})
    let updatedToDo = await List.updateOne(
      {_id:id},
      {$set:{complete:!list.complete}}
    )
    
    const output = {
      updatedToDo,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message)
  }
});

Router.put('/editlist',bearerAuth, async (req, res, next) => {
  try {
    
    let updatedToDo = await List.findByIdAndUpdate(req.body.id,req.body,{new:true})
    
    const output = {
      updatedToDo,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message)
  }
});
Router.delete('/deletelist',bearerAuth, async (req, res, next) => {
  try {
    const {id}=req.body
    let deleted = await List.deleteOne(
      {_id:id}
    )
    
    const output = {
      deleted,
    };
    res.status(200).json(output);
  } catch (e) {
    next(e.message)
  }
});


module.exports = Router;